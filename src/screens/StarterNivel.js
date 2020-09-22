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
  let funnyPhrase = '';
  switch (props.workoutDays.length) {
    case 1:
      funnyPhrase = 'Só um dia não vai adiantar muito!';
      break;
    case 2:
      funnyPhrase = '2 dias ainda é pouco, mas já ajuda!';
      break;
    case 3:
      funnyPhrase = '3 dias já é um bom começo!';
      break;
    case 4:
      funnyPhrase = 'Boa, com 4 dias já dá pra brincar!';
      break;
    case 5:
      funnyPhrase = 'Uou, 5 dias é perfeito!';
      break;
    case 6:
      funnyPhrase = 'Boa sorte na carreira de BodyBuilder!';
      break;
    case 7:
      funnyPhrase = 'Todos os dias?! Super Xandão aprova!';
      break;
  }

  //responsável por setar o level
  const setMyLevel = l => {
    props.setLevel(l);
    props.navigation.setParams({level: l});
  };

  return (
    <Container>
      <HeaderText>{funnyPhrase}</HeaderText>
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
            Iniciante (Frango)
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
            Intermediário (Semi-Maromba)
          </Text>
        </DefaultButton>
        <DefaultButton
          bgColor={props.level === 'avançado' ? '#0072c0' : false}
          underlayColor="#CCC"
          height="50"
          style={{marginBottom: 15}}
          onPress={() => setMyLevel('avançado')}>
          <Text style={{color: props.level == 'avançado' ? '#fff' : '#000'}}>
            Avançado (Super Xandão)
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
