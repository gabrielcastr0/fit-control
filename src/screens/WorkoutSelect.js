/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';

import {StackActions, NavigationActions} from 'react-navigation';
import {HeaderBackButton} from 'react-navigation-stack';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
`;

const WorkoutList = styled.FlatList`
  flex: 1;
  padding: 20px;
`;

const Page = props => {
  //responsável por iniciar treino
  const goWorkout = workout => {
    props.navigation.navigate('WorkoutChecklist', {workout});
  };

  return (
    <Container>
      <WorkoutList
        data={props.myWorkouts}
        renderItem={({item}) => (
          <Workout data={item} goAction={() => goWorkout(item)} />
        )}
      />
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  const handleBackAction = () => {
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AppTab'})],
      }),
    );
  };

  return {
    title: 'Escolha seu treino',
    headerLeft: <HeaderBackButton onPress={handleBackAction} />,
  };
};

const mapStateToProps = state => {
  return {
    myWorkouts: state.userReducer.myWorkouts,
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
