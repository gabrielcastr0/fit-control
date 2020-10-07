/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`;

const ListArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DayItem = styled.TouchableHighlight`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
`;

const DayItemText = styled.Text``;

const LevelItem = styled.TouchableHighlight`
  padding: 0 15px;
  background-color: #eee;
  height: 30px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const LevelItemText = styled.Text``;

const Page = props => {
  const toggleWorkoutDay = d => {
    let newWorkoutDays = [...props.workoutDays];
    if (newWorkoutDays.includes(d)) {
      if (newWorkoutDays.length === 1) {
        // eslint-disable-next-line no-alert
        alert(
          'Não é possível remover esse dia, pois é o único que você treina.',
        );
        return;
      }
      newWorkoutDays = newWorkoutDays.filter(i => i !== d);
    } else {
      newWorkoutDays.push(d);
    }

    props.setWorkoutDays(newWorkoutDays);
  };

  return (
    <Container>
      <Label>Seu nome completo: </Label>
      <Input value={props.name} onChangeText={e => props.setName(e)} />

      <Label>Dias em que você treina: </Label>
      <ListArea>
        <DayItem
          style={
            props.workoutDays.includes(1) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(1)}>
          <DayItemText>S</DayItemText>
        </DayItem>

        <DayItem
          style={
            props.workoutDays.includes(2) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(2)}>
          <DayItemText>T</DayItemText>
        </DayItem>

        <DayItem
          style={
            props.workoutDays.includes(3) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(3)}>
          <DayItemText>Q</DayItemText>
        </DayItem>

        <DayItem
          style={
            props.workoutDays.includes(4) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(4)}>
          <DayItemText>Q</DayItemText>
        </DayItem>

        <DayItem
          style={
            props.workoutDays.includes(5) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(5)}>
          <DayItemText>S</DayItemText>
        </DayItem>

        <DayItem
          style={
            props.workoutDays.includes(6) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(6)}>
          <DayItemText>S</DayItemText>
        </DayItem>

        <DayItem
          style={
            props.workoutDays.includes(0) ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => toggleWorkoutDay(0)}>
          <DayItemText>D</DayItemText>
        </DayItem>
      </ListArea>

      <Label>Seu nível: </Label>
      <ListArea>
        <LevelItem
          style={
            props.level === 'iniciante' ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => props.setLevel('iniciante')}
          underlayColor="transparent">
          <LevelItemText>Iniciante</LevelItemText>
        </LevelItem>

        <LevelItem
          style={
            props.level === 'intermediário' ? {backgroundColor: '#ff0000'} : {}
          }
          onPress={() => props.setLevel('intermediário')}
          underlayColor="transparent">
          <LevelItemText>Intermediário</LevelItemText>
        </LevelItem>

        <LevelItem
          style={props.level === 'avançado' ? {backgroundColor: '#ff0000'} : {}}
          onPress={() => props.setLevel('avançado')}
          underlayColor="transparent">
          <LevelItemText>Avançado</LevelItemText>
        </LevelItem>
      </ListArea>
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  return {
    title: 'Configurações',
  };
};

const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
    workoutDays: state.userReducer.workoutDays,
    level: state.userReducer.level,
  };
};

const mapDispatchToProps = dispatch => {
  //responsável por alterar os dados
  return {
    setName: name => dispatch({type: 'SET_NAME', payload: {name}}),
    setWorkoutDays: workoutDays =>
      dispatch({type: 'SET_WORKOUTDAYS', payload: {workoutDays}}),
    setLevel: level => dispatch({type: 'SET_LEVEL', payload: {level}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
