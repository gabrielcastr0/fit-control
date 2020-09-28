//criando reducer
const initialState = {
  name: '',
  level: '', //iniciante, intermediário, avançado
  workoutDays: [], //Dia 0 - 6 (Seg, Ter, Qua, Qui, Sex, Sab, Dom)
  myWorkouts: [], //treinos
  lastWorkout: '', //ID
  dailyProgress: ['2019-09-13', '2019-09-12'],
};

export default (state = initialState, action) => {
  let myWorkouts = [...state.myWorkouts];

  switch (action.type) {
    case 'SET_NAME': //setando nome do usuário
      return {...state, name: action.payload.name};

    case 'SET_WORKOUTDAYS': //setatndo dias
      return {...state, workoutDays: action.payload.workoutDays};

    case 'SET_LEVEL': //setando level
      return {...state, level: action.payload.level};

    case 'ADD_WORKOUT': //adicionando workout
      if (myWorkouts.findIndex(i => i.id === action.payload.workout.id) < 0) {
        myWorkouts.push(action.payload.workout);
      }
      return {...state, myWorkouts};

    case 'DEL_WORKOUT': //deletando workout
      myWorkouts = myWorkouts.filter(i => i.id !== action.payload.workout.id);
      return {...state, myWorkouts};
  }

  return state;
};
