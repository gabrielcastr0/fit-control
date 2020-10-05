/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

import {Text} from 'react-native';

import HomeMonthScroll from '../components/HomeMonthScroll';
import HomeDaysScroll from '../components/HomeDaysScroll';
import HomeDayStatus from '../components/HomeDayStatus';

const Container = styled.SafeAreaView`
  align-items: center;
`;

const Legend = styled.View`
  width: 90%;
  align-items: flex-start;
  margin-top: 30px;
`;

const LegendText = styled.Text`
  color: #555;
`;

const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const LegendBox = styled.View`
  width: 15px;
  height: 15px;
  background-color: #ccc;
  margin-right: 5px;
`;

const Page = props => {
  let today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth()); //pegando mês atual como useState inicial.
  const [selectedDay, setSelectedDay] = useState(today.getDate()); //pegando dia atual

  return (
    <Container>
      <HomeMonthScroll
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <HomeDaysScroll
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        dailyProgress={props.dailyProgress}
        workoutDays={props.workoutDays}
      />
      <HomeDayStatus />

      <Text>Mês: {selectedMonth}</Text>

      <Legend>
        <LegendText>Legenda:</LegendText>
        <LegendItem>
          <LegendBox style={{backgroundColor: '#b5eeff'}} />
          <LegendText>Hoje</LegendText>
        </LegendItem>

        <LegendItem>
          <LegendBox style={{backgroundColor: '#b5ffb8'}} />
          <LegendText>Treino feito</LegendText>
        </LegendItem>

        <LegendItem>
          <LegendBox style={{backgroundColor: '#ffb5b5'}} />
          <LegendText>Treino perdido</LegendText>
        </LegendItem>

        <LegendItem>
          <LegendBox style={{backgroundColor: '#f4f4aa'}} />
          <LegendText>Dia de descanso</LegendText>
        </LegendItem>

        <LegendItem>
          <LegendBox style={{backgroundColor: '#f4f4f4'}} />
          <LegendText>Dia futuro</LegendText>
        </LegendItem>
      </Legend>
    </Container>
  );
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  const ConfigButtonArea = styled.TouchableHighlight`
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
  `;

  const ConfigButtonImage = styled.Image`
    width: 25px;
    height: 25px;
  `;

  const ConfigButton = () => {
    const btnAction = () => {
      navigation.navigate('HomeConfig');
    };

    return (
      <ConfigButtonArea onPress={btnAction}>
        <ConfigButtonImage source={require('../assets/config.png')} />
      </ConfigButtonArea>
    );
  };

  return {
    title: 'Seu progresso diário',
    headerRight: <ConfigButton />,
    headerRightContainerStyle: {
      marginRight: 10,
    },
  };
};

const mapStateToProps = state => {
  return {
    dailyProgress: state.userReducers.dailyProgress,
    workoutDays: state.userReducers.workoutDays,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
