/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';

import DefaultButton from '../components/DefaultButton';
import ExercisesItemEdit from '../components/ExercisesItemEdit';

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

const ButtonText = styled.Text``;

const ExercisesArea = styled.View`
  flex: 1;
  margin-top: 20px;
  padding-top: 20px;
  border-top-width: 1px;
  border-top-color: #ccc;
`;

const ExercisesList = styled.FlatList`
  flex: 1px;
  padding-top: 20px;
`;

const Page = props => {
  let workout =
    props.navigation.state.params && props.navigation.state.params.workout
      ? props.navigation.state.params.workout
      : false;

  const [id, setId] = useState(workout ? workout.id : '');
  const [name, setName] = useState(workout ? workout.name : '');

  const [exercises, setExercises] = useState(workout ? workout.exercises : []);

  //responsável por editar exercícios
  const editExercise = exercise => {
    alert('EDITAR');
  };

  //responsável por deletar exercícios
  const delExercise = exercise => {
    let newExercises = [...exercises];

    //deletando exercício
    newExercises = newExercises.filter(i => i.id !== exercise.id);

    setExercises(newExercises);
  };

  return (
    <Container>
      <NameInput
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Digite o nome do treino"
      />
      <ExercisesArea>
        <DefaultButton bgColor="#4ac3ae">
          <ButtonText>Adicionar Exercício</ButtonText>
        </DefaultButton>

        <ExercisesList
          data={exercises}
          renderItem={({item}) => (
            <ExercisesItemEdit
              data={item}
              editAction={() => editExercise(item)}
              delAction={() => delExercise(item)}
            />
          )}
          keyExtractor={item => item.name}
        />
      </ExercisesArea>
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

  //responsável por salvar treinos adicionados/editados
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
