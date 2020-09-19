import React from 'react';
import styled from 'styled-components/native';
import {Button} from 'react-native';
import {connect} from 'react-redux';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
`;

const HeaderText = styled.Text`
  font-size: 22px;
  color: #333;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const NameInput = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;

const NextBtn = props => {
  //responsável pela função disparada pelo botão
  const nextAction = () => {
    //verifica se algo foi digitado
    // if (!props.navigation.state.params || !props.navigation.state.params.name) {
    //   alert('Você precisa de um nome!');
    //   return;
    // }

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

  return (
    <Container>
      <HeaderText>Qual é o seu nome?</HeaderText>
      <NameInput
        value={props.name}
        onChangeText={t => props.setName(t)}
        autoFocus={true}
        autoCapitalize="words"
        onSubmitEditing={nextAction}
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
