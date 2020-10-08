/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
`;

const WorkoutList = styled.FlatList`
  flex: 1;
  padding: 20px;
`;

const Page = props => {
  return (
    <Container>
      <WorkoutList
        data={props.myWorkouts}
        renderItem={({item}) => (
          <Workout data={item} editAction={() => {}} delAction={() => {}} />
        )}
      />
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  const ButtonArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
  `;

  const ButtonImage = styled.Image`
    width: 25px;
    height: 25px;
  `;

  const AddWorkoutButton = () => {
    return (
      <ButtonArea>
        <ButtonImage source={require('../assets/add.png')} />
      </ButtonArea>
    );
  };

  return {
    title: 'Meus Treinos',
    headerRight: <AddWorkoutButton />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
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
