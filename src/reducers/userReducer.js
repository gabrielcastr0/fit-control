//criando reducer
const initialState = {
  name: '',
  level: '', //iniciante, intermediário, avançado
  workoutDays: [], //Dia 0 - 6 (Seg, Ter, Qua, Qui, Sex, Sab, Dom)
  myWorkouts: [], //treinos
  lastWorkout: '', //ID
  dailyProgress: [],
};

export default (state = initialState, action) => {
  let myWorkouts = [...state.myWorkouts];
  let dailyProgress = [...state.dailyProgress];

  switch (action.type) {
    case 'SET_NAME': //setando nome do usuário
      return {...state, name: action.payload.name};

    case 'SET_WORKOUTDAYS': //setatndo dias
      return {...state, workoutDays: action.payload.workoutDays};

    case 'SET_LEVEL': //setando level
      return {...state, level: action.payload.level};

    case 'SET_LASTWORKOUT':
      return {...state, lastWorkout: action.payload.id};

    case 'ADD_WORKOUT': //adicionando workout
      if (myWorkouts.findIndex(i => i.id === action.payload.workout.id) < 0) {
        myWorkouts.push(action.payload.workout);
      }
      return {...state, myWorkouts};

    case 'EDIT_WORKOUT':
      let index = myWorkouts.findIndex(i => i.id === action.payload.workout.id);
      if (index > -1) {
        myWorkouts[index] = action.payload.workout;
      }
      return {...state, myWorkouts};

    case 'DEL_WORKOUT': //deletando workout
      myWorkouts = myWorkouts.filter(i => i.id !== action.payload.workout.id);
      return {...state, myWorkouts};

    case 'ADD_PROGRESS': //adicionando progresso
      if (!dailyProgress.includes(action.payload.date)) {
        dailyProgress.push(action.payload.date);
      }
      return {...state, dailyProgress};

    case 'DEL_PROGRESS': //deletando progresso
      dailyProgress = dailyProgress.filter(i => i !== action.payload.date);
      return {...state, dailyProgress};

    case 'RESET': //responsável por resetar as configs
      return initialState;
  }

  return state;
};
