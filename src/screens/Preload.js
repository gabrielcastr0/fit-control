import {StackActions, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

//criando preload
const Preload = props => {
  if (!props.name) {
    //caso não tiver nome de usuário, manda para StarterStack
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'StarterStack'})],
      }),
    );
  } else {
    //caso tiver, manda para AppTab
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'AppTab'})],
      }),
    );
  }

  return null;
};

//pegando nome do usuário (vai retornar como props)
const mapStateToProps = state => {
  return {
    name: state.userReducer.name,
  };
};

export default connect(mapStateToProps)(Preload);
