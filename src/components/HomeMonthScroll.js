/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const MonthScroll = styled.ScrollView`
  width: 100%;
  height: 60px;
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

let months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const screenWidth = Math.round(Dimensions.get('window').width);
const thirdW = screenWidth / 3;

export default props => {
  const MonthRef = useRef();

  const [selectedMonth, setSelectedMonth] = useState(props.selectedMonth);

  //responsável por pegar a pos. do mês atual
  const handleScrollEnd = e => {
    let posX = e.nativeEvent.contentOffset.x;
    let targetMonth = Math.round(posX / thirdW);
    setSelectedMonth(targetMonth);
  };

  //responsável por fazer o scroll até o mês referente a pos.
  const scrollToMonth = m => {
    let posX = m * thirdW;
    MonthRef.current.scrollTo({x: posX, y: 0, animated: true});
  };

  useEffect(() => {
    props.setSelectedMonth(selectedMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  useEffect(() => {
    setTimeout(() => {
      scrollToMonth(selectedMonth);
    }, 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedMonth]);

  return (
    <MonthScroll
      horizontal={true}
      ref={MonthRef}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={thirdW}
      contentContainerStyle={{paddingLeft: thirdW, paddingRight: thirdW}}
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
    </MonthScroll>
  );
};
