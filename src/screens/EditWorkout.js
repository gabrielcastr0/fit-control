/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

const NameInput = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;

const Page = props => {
  let workout =
    props.navigation.state.params && props.navigation.state.params.workout
      ? props.navigation.state.params.workout
      : false;

  const [id, setId] = useState(workout ? workout.id : '');
  const [name, setName] = useState(workout ? workout.name : '');

  return (
    <Container>
      <NameInput
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Digite o nome do treino"
      />
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  let isEdit =
    navigation.state.params && navigation.state.params.workout ? true : false;

  const SaveArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
  `;

  const SaveImage = styled.Image`
    width: 25px;
    height: 25px;
  `;

  const SaveWorkoutButton = () => {
    return (
      <SaveArea>
        <SaveImage source={require('../assets/check-black.png')} />
      </SaveArea>
    );
  };

  return {
    title: isEdit ? 'Editar Treino' : 'Adicionar Treino',
    headerRight: <SaveWorkoutButton />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  //responsável por alterar os dados
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
