import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Button} from 'react-native';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';

import {addWorkout, delWorkout} from '../actions/userActions';
import workoutJson from '../presetWorkouts.json';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 50px;
`;

const HeaderText = styled.Text`
  font-size: 17px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const FooterText = styled.Text`
  font-size: 17px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

const WorkoutList = styled.FlatList`
  width: 100%;
`;

const NextBtn = props => {
  let btnTitle = 'Ignorar';
  if (
    props.navigation.state.params &&
    props.navigation.state.params.hasWorkout
  ) {
    btnTitle = 'Concluir';
  }

  //responsável pela função disparada pelo botão
  const nextAction = () => {
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AppTab'})],
      }),
    );
  };

  return <Button title={btnTitle} onPress={nextAction} />;
};

const Page = props => {
  //verifica se o Workout já exista na lista de Workouts, se sim, irá remover, se não, irá adicionar.
  const addWorkout = item => {
    if (props.myWorkouts.findIndex(i => i.id === item.id) < 0) {
      props.addWorkout(item);
    } else {
      props.delWorkout(item);
    }
  };

  //responsável por mandar um novo myWorkouts caso mudar
  useEffect(() => {
    if (props.myWorkouts.length > 0) {
      props.navigation.setParams({hasWorkout: true});
    } else {
      props.navigation.setParams({hasWorkout: false});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.myWorkouts]);

  return (
    <Container>
      <HeaderText>Vamos mostrar alguns treinos pré-criados:</HeaderText>
      <WorkoutList
        data={workoutJson}
        renderItem={({item}) => (
          <Workout addAction={() => addWorkout(item)} data={item} />
        )}
        keyExtractor={item => item.id}
      />
      <FooterText>
        <BoldText>Você selecionou {props.myWorkouts.length} treino(s)</BoldText>
      </FooterText>
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  return {
    title: '',
    headerRight: <NextBtn navigation={navigation} />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts, //pegando workouts selecionados
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWorkout: workout => addWorkout(workout, dispatch),
    delWorkout: workout => delWorkout(workout, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
