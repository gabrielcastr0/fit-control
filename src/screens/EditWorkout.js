/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import Workout from '../components/Workout';

const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 30px;
`;

const Page = props => {
  return <Container />;
};

//configurando os botões do header da tela
Page.navigationOptions = ({navigation}) => {
  return {
    title: 'Editar Treino',
  };
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  //responsável por alterar os dados
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Page);
