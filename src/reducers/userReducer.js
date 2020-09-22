//criando reducer
const initialState = {
  name: '',
  level: '', //iniciante, intermediário, avançado
  workoutDays: [], //Dia 0 - 6 (Seg, Ter, Qua, Qui, Sex, Sab, Dom)
  myWorkouts: [],
  lastWorkout: '', //ID
  dailyProgress: ['2019-09-13', '2019-09-12'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {...state, name: action.payload.name}; //mudando nome do usuário
    case 'SET_WORKOUTDAYS':
      return {...state, workoutDays: action.payload.workoutDays}; //mudando dias
    case 'SET_LEVEL':
      return {...state, level: action.payload.level};
  }

  return state;
};
