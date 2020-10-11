/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';

import DefaultButton from '../components/DefaultButton';
import ExercisesItemEdit from '../components/ExercisesItemEdit';
import CustomModal from '../components/CustomModal';

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

const ModalLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
`;

const ModalMuscles = styled.ScrollView``;

const ModalInput = styled.TextInput`
  width: 100%;
  font-size: 14px;
  color: #333;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const ModalMuscle = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  opacity: ${props => props.opacity};
`;

const ModalMuscleImg = styled.Image`
  width: 35px;
  height: 35px;
`;

const ModalExtra = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ModalExtraItem = styled.View`
  align-items: center;
`;

const Page = props => {
  let workout =
    props.navigation.state.params && props.navigation.state.params.workout
      ? props.navigation.state.params.workout
      : false;

  const [id, setId] = useState(workout ? workout.id : '');
  const [name, setName] = useState(workout ? workout.name : '');

  const [exercises, setExercises] = useState(workout ? workout.exercises : []);

  //propriedades do modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalMuscle, setModalMuscle] = useState('');
  const [modalSets, setModalSets] = useState('');
  const [modalReps, setModalReps] = useState('');
  const [modalLoad, setModalLoad] = useState('');

  //responsável por editar exercícios
  const editExercise = exercise => {
    setModalId(exercise.id);
    setModalName(exercise.name);
    setModalMuscle(exercise.muscle);
    setModalSets(exercise.sets);
    setModalReps(exercise.reps);
    setModalLoad(exercise.load);
    setModalVisible(true);
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
      <CustomModal
        visible={modalVisible}
        closeAction={() => setModalVisible(false)}>
        <ModalLabel>Músculo de foco</ModalLabel>
        <ModalMuscles horizontal={true} showsHorizontalScrollIndicator={false}>
          <ModalMuscle
            opacity={modalMuscle == 'abs' ? 1 : 0.3}
            onPress={() => setModalMuscle('abs')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/abs.png')} />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'back' ? 1 : 0.3}
            onPress={() => setModalMuscle('back')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/back.png')} />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'biceps' ? 1 : 0.3}
            onPress={() => setModalMuscle('biceps')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/biceps.png')} />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'chest' ? 1 : 0.3}
            onPress={() => setModalMuscle('chest')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/chest.png')} />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'gluteos' ? 1 : 0.3}
            onPress={() => setModalMuscle('gluteos')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/gluteos.png')} />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'legs' ? 1 : 0.3}
            onPress={() => setModalMuscle('legs')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/legs.png')} />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'shoulders' ? 1 : 0.3}
            onPress={() => setModalMuscle('shoulders')}
            underlayColor="transparent">
            <ModalMuscleImg
              source={require('../assets/muscles/shoulders.png')}
            />
          </ModalMuscle>

          <ModalMuscle
            opacity={modalMuscle == 'triceps' ? 1 : 0.3}
            onPress={() => setModalMuscle('triceps')}
            underlayColor="transparent">
            <ModalMuscleImg source={require('../assets/muscles/triceps.png')} />
          </ModalMuscle>
        </ModalMuscles>

        <ModalLabel>Nome do exercício</ModalLabel>
        <ModalInput
          value={modalName}
          onChangeText={e => setModalName(e)}
          keyboardType="numeric"
        />

        <ModalExtra>
          <ModalExtraItem>
            <ModalLabel>Séries</ModalLabel>
            <ModalInput
              value={modalSets}
              onChangeText={e => setModalSets(e)}
              keyboardType="numeric"
            />
          </ModalExtraItem>

          <ModalExtraItem>
            <ModalLabel>Repetições</ModalLabel>
            <ModalInput
              value={modalReps}
              onChangeText={e => setModalReps(e)}
              keyboardType="numeric"
            />
          </ModalExtraItem>

          <ModalExtraItem>
            <ModalLabel>Carga</ModalLabel>
            <ModalInput
              value={modalLoad}
              onChangeText={e => setModalLoad(e)}
              keyboardType="numeric"
            />
          </ModalExtraItem>
        </ModalExtra>

        <DefaultButton bgColor="#4ac34e">
          <ButtonText>Salvar</ButtonText>
        </DefaultButton>
      </CustomModal>
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
