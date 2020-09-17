//criando reducer
const initialState = {
  name: '',
  level: '', //iniciante, intermediário, avançado
  workoutDays: [], //Dia 1 - 0
  myWorkouts: [],
  lastWorkout: '', //ID
  dailyProgress: ['2020-09-13', '2020-09-12'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {...state, name: action.payload.name}; //mudando nome do usuário
      break;
  }

  return state;
};
