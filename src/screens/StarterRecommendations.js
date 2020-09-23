import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {Button, Text} from 'react-native';
import {connect} from 'react-redux';

import workoutJson from '../presetWorkouts.json';

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

const BoldText = styled.Text`
  font-weight: bold;
`;

const WorkoutList = styled.FlatList`
  width: 100%;
`;

const NextBtn = props => {
  //responsável por mandar um novo myWorkouts caso mudar
  // useEffect(() => {
  //   props.navigation.setParams({myWorkouts: props.myWorkouts});
  // }, [props.myWorkouts, props.navigation]);

  let btnTitle = 'Ignorar';
  if (
    props.navigation.state.params &&
    props.navigation.state.params.myWorkouts.length > 0
  ) {
    btnTitle = 'Concluir';
  }
  //responsável pela função disparada pelo botão
  const nextAction = () => {
    //verifica se algo foi digitado
    if (
      !props.navigation.state.params ||
      !props.navigation.state.params.level
    ) {
      alert('Você precisa escolher uma opção!');
      return;
    }

    //manda p/ a tela de StarterRecommendations
    props.navigation.navigate('StarterRecommendations');
  };

  return <Button title={btnTitle} onPress={nextAction} />;
};

const Page = props => {
  return (
    <Container>
      <HeaderText>Opções de treinos pré-criados!</HeaderText>
      <HeaderText>
        <BoldText>Você selecionou {props.myWorkouts.length} treinos</BoldText>
      </HeaderText>

      <WorkoutList
        data={workoutJson}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id}
      />
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
    setLevel: level => dispatch({type: 'SET_LEVEL', payload: {level}}), //setando level
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
