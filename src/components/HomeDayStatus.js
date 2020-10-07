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
`;

const ButtonText = styled.Text`
  color: #fff;
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

  //verificando a situação do dia (dia de descanso, dia futuro, feito/não feito)
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

  //verificando se é hoje
  if (thisDate.getTime() === today.getTime()) {
    isToday = true;
  }

  return (
    <>
      <BalloonTriangle />
      <BalloonArea>
        {dayOff && <BalloonBigText>Dia de descanso</BalloonBigText>}
        {isFuture && <BalloonBigText>Dia futuro</BalloonBigText>}
        {!dayOff && !isFuture && isDone && (
          <>
            <BalloonBigText>Parabéns, treino feito!</BalloonBigText>
            <DefaultButton>
              <ButtonText>Desmarcar</ButtonText>
            </DefaultButton>
          </>
        )}
        {!dayOff && !isFuture && !isDone && !isToday && (
          <>
            <BalloonBigText>Oh, treino perdido!</BalloonBigText>
            <DefaultButton>
              <ButtonText>Marcar</ButtonText>
            </DefaultButton>
          </>
        )}
      </BalloonArea>
    </>
  );
};
