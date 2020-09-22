import {createStackNavigator} from 'react-navigation-stack';

import StarterIntro from '../screens/StarterIntro';
import StarterName from '../screens/StarterName';
import StarterDias from '../screens/StarterDias';
import StarterNivel from '../screens/StarterNivel';

//definindo navegação de telas
export default createStackNavigator({
  StarterIntro,
  StarterName,
  StarterDias,
  StarterNivel,
});
