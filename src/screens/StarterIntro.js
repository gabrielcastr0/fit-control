import React from 'react';
import styled from 'styled-components';

import DefaultButton from '../components/DefaultButton';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin-left: 30px;
  margin-right: 30px;
`;

const WelcomeText = styled.Text`
  font-size: 23px;
  color: #333;
  margin-top: 50px;
`;

const WelcomeImage = styled.View`
  flex: 1;
  justify-content: center;
`;

const WelcomeLogo = styled.Image`
  width: 350px;
  height: 350px;
`;

const BeginConfigArea = styled.View`
  width: 100%;
  margin-bottom: 50px;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

const Page = props => {
  //responsável em mandar p/ próxima tela
  const start = () => {
    props.navigation.navigate('StarterName');
  };

  return (
    <Container>
      <WelcomeText>Bem vindo(a) ao FitControl!</WelcomeText>
      <WelcomeImage>
        <WelcomeLogo source={require('../assets/boneco2.png')} />
      </WelcomeImage>
      <BeginConfigArea>
        <DefaultButton
          width="100%"
          height="50px"
          bgColor="#0072c0"
          underlayColor="#0b7ac6"
          onPress={start}>
          <ButtonText>Iniciar Configuração</ButtonText>
        </DefaultButton>
      </BeginConfigArea>
    </Container>
  );
};

Page.navigationOption = {
  header: null,
};

export default Page;
