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

const DaysArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NextBtn = props => {
  //responsável pela função disparada pelo botão
  const nextAction = () => {
    //verifica se algo foi digitado
    if (
      !props.navigation.state.params ||
      !props.navigation.state.params.workoutDays.length
    ) {
      alert('Você precisa treinar pelo menos 1 dia!');
      return;
    }

    //manda p/ a tela de StarterDias
    props.navigation.navigate('StarterLevel');
  };

  return <Button title="Próximo" onPress={nextAction} />;
};

const Page = props => {
  const nextAction = () => {
    //verifica se foi inserido um nome
    if (!props.name) {
      alert('Por favor, insira um nome!');
      return;
    }

    //manda p/ a tela de StarterDias
    props.navigation.navigate('StarterDias');
  };

  //verifica se o dia foi marcado ou não
  const toggleDay = d => {
    let newWorkoutDays = [...props.workoutDays];
    if (!props.workoutDays.includes(d)) {
      //marcando dias
      newWorkoutDays.push(d);
    } else {
      //removendo dias marcados
      newWorkoutDays = newWorkoutDays.filter(i => i !== d);
    }
    props.setWorkoutDays(newWorkoutDays);
    props.navigation.setParams({workoutDays: newWorkoutDays});
  };

  let firstName = props.name.split(' ')[0];

  return (
    <Container>
      <HeaderText>
        Fala <BoldText>{firstName}</BoldText>, tudo bem?
      </HeaderText>
      <HeaderText>
        Quais <BoldText>dias da semana</BoldText> você pretende treinar?
      </HeaderText>

      <DaysArea>
        <DefaultButton
          bgColor={props.workoutDays.includes(1) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={95}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(1)}>
          <Text
            style={{color: props.workoutDays.includes(1) ? '#fff' : '#000'}}>
            Segunda
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.workoutDays.includes(2) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={95}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(2)}>
          <Text
            style={{color: props.workoutDays.includes(2) ? '#fff' : '#000'}}>
            Terça
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.workoutDays.includes(3) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={95}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(3)}>
          <Text
            style={{color: props.workoutDays.includes(3) ? '#fff' : '#000'}}>
            Quarta
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.workoutDays.includes(4) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={95}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(4)}>
          <Text
            style={{color: props.workoutDays.includes(4) ? '#fff' : '#000'}}>
            Quinta
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.workoutDays.includes(5) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={95}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(5)}>
          <Text
            style={{color: props.workoutDays.includes(5) ? '#fff' : '#000'}}>
            Sexta
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.workoutDays.includes(6) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={95}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(6)}>
          <Text
            style={{color: props.workoutDays.includes(6) ? '#fff' : '#000'}}>
            Sábado
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.workoutDays.includes(0) ? '#0072c0' : false}
          underlayColor="#CCC"
          width={97}
          style={{marginBottom: 15}}
          onPress={() => toggleDay(0)}>
          <Text
            style={{color: props.workoutDays.includes(0) ? '#fff' : '#000'}}>
            Domingo
          </Text>
        </DefaultButton>
      </DaysArea>
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
    name: state.userReducer.name, //pegando nome do usuário enquando digita
    workoutDays: state.userReducer.workoutDays, //pegando os dias da semana no reducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}), //setando name do usuário
    setWorkoutDays: workoutDays =>
      dispatch({type: 'SET_WORKOUTDAYS', payload: {workoutDays}}), //setando dias
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
