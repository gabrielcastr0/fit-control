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
    if (!props.navigation.state.params || !props.navigation.state.params.name) {
      alert('Por favor, insira um nome!');
      return;
    }

    //manda p/ a tela de StarterDias
    props.navigation.navigate('StarterDias');
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
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Segunda</Text>
        </DefaultButton>
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Terça</Text>
        </DefaultButton>
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Quarta</Text>
        </DefaultButton>
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Quinta</Text>
        </DefaultButton>
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Sexta</Text>
        </DefaultButton>
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Sábado</Text>
        </DefaultButton>
        <DefaultButton width={100} style={{marginBottom: 15}}>
          <Text>Domingo</Text>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}), //setando name do usuário
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
