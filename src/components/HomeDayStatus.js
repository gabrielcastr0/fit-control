/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';

import DefaultButton from '../components/DefaultButton';

const BalloonTriangle = styled.View`
  width: 0;
  height: 0;
  border-left-color: transparent;
  border-left-width: 15px;
  border-bottom-width: 15px;
  border-bottom-color: #ededed;
  border-right-width: 15px;
  border-right-color: transparent;
`;

const BalloonArea = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #ededed;
  border-radius: 10px;
  min-height: 100px;
`;

const BalloonBigText = styled.Text`
  font-size: 15px;
  align-self: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const BalloonText = styled.Text`
  font-size: 13px;
  align-self: center;
  margin-top: 10px;
`;

const Strong = styled.Text`
  font-weight: bold;
`;

export default props => {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  //pegando o dia referente à data.
  let thisDate = new Date(
    today.getFullYear(),
    props.selectedMonth,
    props.selectedDay,
  );

  let thisYear = thisDate.getFullYear();
  let thisMonth = thisDate.getMonth() + 1;
  let thisDay = thisDate.getDate();
  thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
  thisDay = thisDay < 10 ? '0' + thisDay : thisDay;

  let dFormated = `${thisYear}-${thisMonth}-${thisDay}`; //gerando dailyProgress no formato US

  let dayOff = false;
  let isToday = false;
  let isFuture = false;
  let isDone = false;

  //verificando a situação do dia (dia de descanso, dia futuro, treino feito/treino perdido)
  if (!props.workoutDays.includes(thisDate.getDay())) {
    dayOff = true;
  } else if (thisDate.getTime() > today.getTime()) {
    isFuture = true;
  } else {
    if (props.dailyProgress.includes(dFormated)) {
      isDone = true;
    } else {
      isDone = false;
    }
  }

  //verificando se o dia de treino é hoje
  if (thisDate.getTime() === today.getTime()) {
    isToday = true;
  }

  const setDone = () => {
    props.addProgress(dFormated);
  };

  const setUnDone = () => {
    props.delProgress(dFormated);
  };

  return (
    <>
      <BalloonTriangle />
      <BalloonArea>
        {dayOff && (
          <BalloonBigText>
            <Strong>Dia de descanso</Strong>
          </BalloonBigText>
        )}

        {isFuture && (
          <BalloonBigText>
            <Strong>Dia futuro</Strong>
          </BalloonBigText>
        )}

        {!dayOff && !isFuture && isDone && (
          <>
            <BalloonBigText>
              <Strong>Parabéns, treino feito!</Strong>
            </BalloonBigText>

            <DefaultButton
              bgColor="#4ac34e"
              style={{marginTop: 10}}
              onPress={setUnDone}
              underlayColor="#4ac34e">
              <ButtonText>Desmarcar</ButtonText>
            </DefaultButton>
          </>
        )}

        {!dayOff && !isFuture && !isDone && !isToday && (
          <>
            <BalloonBigText>
              <Strong>Oh, treino perdido!</Strong>
            </BalloonBigText>

            <DefaultButton
              bgColor="#4ac34e"
              style={{marginTop: 10}}
              onPress={setDone}
              underlayColor="#4ac34e">
              <ButtonText>Marcar</ButtonText>
            </DefaultButton>
          </>
        )}

        {!dayOff && !isFuture && !isDone && isToday && (
          <>
            <BalloonBigText>
              <Strong>Hoje tem treino!</Strong>
            </BalloonBigText>

            <BalloonText>Você tem ... para treinar</BalloonText>

            <DefaultButton
              bgColor="#4ac34e"
              style={{marginTop: 10}}
              onPress={props.goToWorkout}
              underlayColor="#4ac34e">
              <ButtonText>Iniciar treino</ButtonText>
            </DefaultButton>
          </>
        )}
      </BalloonArea>
    </>
  );
};
