import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {Button} from 'react-native';
import {connect} from 'react-redux';

import DefaultButton from '../components/DefaultButton';

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

const LevelArea = styled.View`
  width: 100%;
`;

const NextBtn = props => {
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

  return <Button title="Próximo" onPress={nextAction} />;
};

const Page = props => {
  let count = '';
  switch (props.workoutDays.length) {
    case 1:
      count = 1;
      break;
    case 2:
      count = 2;
      break;
    case 3:
      count = 3;
      break;
    case 4:
      count = 4;
      break;
    case 5:
      count = 5;
      break;
    case 6:
      count = 6;
      break;
    case 7:
      count = 7;
      break;
  }

  //responsável por setar o level
  const setMyLevel = l => {
    props.setLevel(l);
    props.navigation.setParams({level: l});
  };

  return (
    <Container>
      <HeaderText>Você escolheu treinar {count} dias da semana!</HeaderText>
      <HeaderText>
        <BoldText>Qual é o seu nível atualmente?</BoldText>
      </HeaderText>

      <LevelArea>
        <DefaultButton
          bgColor={props.level === 'iniciante' ? '#0072c0' : false}
          underlayColor="#CCC"
          height="50"
          style={{marginBottom: 15}}
          onPress={() => setMyLevel('iniciante')}>
          <Text style={{color: props.level == 'iniciante' ? '#fff' : '#000'}}>
            Iniciante
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.level === 'intermediário' ? '#0072c0' : false}
          underlayColor="#CCC"
          height="50"
          style={{marginBottom: 15}}
          onPress={() => setMyLevel('intermediário')}>
          <Text
            style={{color: props.level == 'intermediário' ? '#fff' : '#000'}}>
            Intermediário
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.level === 'avançado' ? '#0072c0' : false}
          underlayColor="#CCC"
          height="50"
          style={{marginBottom: 15}}
          onPress={() => setMyLevel('avançado')}>
          <Text style={{color: props.level == 'avançado' ? '#fff' : '#000'}}>
            Avançado
          </Text>
        </DefaultButton>
      </LevelArea>
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
    level: state.userReducer.level, //pegando nível do usuário no reducer
    workoutDays: state.userReducer.workoutDays, //pegando os dias da semana no reducer
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
