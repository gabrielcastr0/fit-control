/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, Text} from 'react-native';
import styled from 'styled-components/native';

const DaysScroll = styled.ScrollView`
  width: 100%;
  height: 50px;
`;

const screenWidth = Math.round(Dimensions.get('window').width);
const dayW = Math.round(screenWidth / 9);
let offsetW = Math.round((screenWidth - dayW) / 2);

const Day = props => {
  return <Text>{props.day}</Text>;
};

export default props => {
  const DayRef = useRef();

  const [selectedDay, setSelectedDay] = useState(props.selectedMonth);

  //responsável por pegar a pos. do dia atual
  const handleScrollEnd = e => {
    // let posX = e.nativeEvent.contentOffset.x;
    // let targetMonth = Math.round(posX / thirdW);
    // setSelectedDay(targetMonth);
  };

  //responsável por fazer o scroll até o dia referente a pos.
  const scrollToDay = m => {
    // let posX = m * thirdW;
    // DayRef.current.scrollTo({x: posX, y: 0, animated: true});
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
          onPress={() => scrollToDay(d)}
        />
      ))}
    </DaysScroll>
  );
};
