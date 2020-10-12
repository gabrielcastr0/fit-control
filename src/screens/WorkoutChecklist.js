/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import {StatusBar} from 'react-native';

import {StackActions, NavigationActions} from 'react-navigation';

import ExerciseItem from '../components/ExerciseItem';

const Container = styled.ImageBackground`
  flex: 1;
  align-items: center;
  background-color: #000;
`;

const SafeArea = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: rgba(1, 59, 14, 0.9);
`;

const WorkoutHeader = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  height: 70px;
`;

const WorkoutTitle = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 20px;
`;

const WorkoutClose = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const WorkoutCloseText = styled.Text`
  font-size: 22px;
  color: #fff;
  font-weight: bold;
`;

const WorkoutList = styled.FlatList`
  width: 90%;
  flex: 1;
`;

const Page = props => {
  let workout = props.navigation.state.params.workout;

  const [exercises, setExercises] = useState([...workout.exercises]);

  const checkAction = exercise => {};

  return (
    <Container source={require('../assets/fitness.jpg')}>
      <StatusBar barStyle="light-content" />
      <SafeArea>
        <WorkoutHeader>
          <WorkoutTitle>{workout.name}</WorkoutTitle>
          <WorkoutClose
            onPress={() => props.navigation.goBack()}
            underlayColor="transparent">
            <WorkoutCloseText>X</WorkoutCloseText>
          </WorkoutClose>
        </WorkoutHeader>
        <WorkoutList
          data={exercises}
          renderItem={({item, index}) => (
            <ExerciseItem
              data={item}
              index={index}
              checkAction={() => checkAction(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeArea>
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  return {
    header: null,
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts,
    lastWorkout: state.userReducer.lastWorkout,
  };
};

const mapDispatchToProps = dispatch => {
  //responsável por alterar os dados
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
