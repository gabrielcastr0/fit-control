import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import CustomTabBar from '../components/CustomTabBar';

import HomeStack from './HomeStack';
//import WorkoutStack from './WorkoutStack';
//import MyWorkoutsStack from './MyWorkoutStack';

export default createBottomTabNavigator(
  {
    HomeStack,
    // WorkoutStack,
    // MyWorkoutsStack,
  },
  {
    //criando TabBar customizada
    tabBarComponent: props => (
      <CustomTabBar
        {...props}
        items={[
          {
            type: 'regular',
            text: 'Início',
            icon: require('../assets/home.png'),
            route: 'HomeStack',
          },
          {
            type: 'big',
            icon: require('../assets/dumbbell.png'),
            route: 'WorkoutStack',
          },
          {
            type: 'regular',
            text: 'Meus Treinos',
            icon: require('../assets/myworkouts.png'),
            route: 'MyWorkoutsStack',
          },
        ]}
      />
    ),
  },
);
