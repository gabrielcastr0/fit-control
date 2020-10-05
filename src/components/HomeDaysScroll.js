/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const DaysScroll = styled.ScrollView`
  width: 100%;
  height: 50px;
`;

const MonthButton = styled.TouchableHighlight`
  width: ${props => props.width};
  justify-content: center;
  align-items: center;
`;

const MonthItem = styled.View`
  width: 90%;
  height: 30px;
  background-color: #eee;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const MonthText = styled.Text``;

const screenWidth = Math.round(Dimensions.get('window').width);
const dayW = Math.round(screenWidth / 9);
let offsetW = Math.round((screenWidth - dayW) / 2);

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

  return (
    <DaysScroll
      horizontal={true}
      ref={DayRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={dayW}
      contentContainerStyle={{paddingLeft: offsetW, paddingRight: offsetW}}
      onMomentumScrollEnd={handleScrollEnd}>
      {months.map((m, k) => (
        <MonthButton
          key={k}
          width={thirdW}
          onPress={() => setSelectedMonth(k)}
          underlayColor="transparent">
          <MonthItem
            style={
              k === selectedMonth
                ? {backgroundColor: '#ccc', width: '100%', height: 40}
                : {}
            }>
            <MonthText>{m}</MonthText>
          </MonthItem>
        </MonthButton>
      ))}
    </DaysScroll>
  );
};
