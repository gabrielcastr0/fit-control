/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const DaysScroll = styled.ScrollView`
  width: 100%;
  height: 50px;
`;

const DayButton = styled.TouchableHighlight`
  width: ${props => props.width};
  justify-content: center;
  align-items: center;
`;

const DayItem = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
`;

const DayText = styled.Text``;

const screenWidth = Math.round(Dimensions.get('window').width);
const dayW = Math.round(screenWidth / 9);
let offsetW = Math.round((screenWidth - dayW) / 2);

const Day = ({day, month, dailyProgress, workoutDays, onPress}) => {
  let bgColor = '#f4f4f4';
  let opacity = 1;

  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  //pegando o dia referente à data.
  let thisDate = new Date(today.getFullYear(), month, day);

  if (workoutDays.includes(thisDate.getDay())) {
    //verificando se o usuário realizou o treino em tal dia
    if (thisDate.getTime() < today.getTime()) {
      let thisYear = thisDate.getFullYear();
      let thisMonth = thisDate.getMonth() + 1;
      let thisDay = thisDate.getDate();
      thisMonth = thisMonth < 10 ? '0' + thisMonth : thisMonth;
      thisDay = thisDay < 10 ? '0' + thisDay : thisDay;

      let dFormated = `${thisYear}-${thisMonth}-${thisDay}`; //gerando dailyProgress no formato US

      if (dailyProgress.includes(dFormated)) {
        bgColor = '#b5ffb8'; //treinou
      } else {
        bgColor = '#ffb5b5'; //não treinou
      }
    }
  } else {
    //verificando se é dia de descanso
    opacity = 0.2;
  }

  //verificando se é o mesmo dia do atual
  if (thisDate.getTime() === today.getTime()) {
    bgColor = '#b5eeff';
  }

  return (
    <DayButton width={dayW} onPress={onPress} underlayColor="transparent">
      <DayItem style={{opacity, backgroundColor: bgColor}}>
        <DayText>{day}</DayText>
      </DayItem>
    </DayButton>
  );
};

export default props => {
  const DayRef = useRef();

  const [selectedDay, setSelectedDay] = useState(props.selectedDay);

  //responsável por pegar a pos. do dia atual
  const handleScrollEnd = e => {
    let posX = e.nativeEvent.contentOffset.x;
    let targetDay = Math.round(posX / dayW) + 1;
    setSelectedDay(targetDay);
  };

  //responsável por fazer o scroll até o dia referente a pos.
  const scrollToDay = d => {
    let posX = (d - 1) * dayW;
    DayRef.current.scrollTo({x: posX, y: 0, animated: true});
  };

  useEffect(() => {
    props.setSelectedDay(selectedDay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  useEffect(() => {
    setTimeout(() => {
      if (props.selectedMonth === new Date().getMonth()) {
        scrollToDay(new Date().getDate());
      } else {
        scrollToDay(1);
      }
    }, 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedMonth]);

  let days = [];

  //pegando a quantidade de dias do mês atual
  let daysInMonth = new Date(
    new Date().getFullYear(),
    props.selectedMonth + 1,
    0,
  ).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <DaysScroll
      horizontal={true}
      ref={DayRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={dayW}
      contentContainerStyle={{paddingLeft: offsetW, paddingRight: offsetW}}
      onMomentumScrollEnd={handleScrollEnd}>
      {days.map((d, k) => (
        <Day
          key={k}
          day={d}
          month={props.selectedMonth}
          dailyProgress={props.dailyProgress}
          workoutDays={props.workoutDays}
          // onPress={() => scrollToDay(d)}
        />
      ))}
    </DaysScroll>
  );
};
