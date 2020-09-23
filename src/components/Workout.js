import React from 'react';
import styled from 'styled-components/native';

const Workout = styled.View`
  background-color: #f1f1f1;
  flex-direction: row;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
`;

const WorkoutInfo = styled.View`
  flex: 1;
`;

const WorkoutTitle = styled.Text`
  font-size: 17;
  margin: 10px;
`;

const MuscleScroll = styled.ScrollView``;
const WorkoutActions = styled.View``;
const WorkoutButton = styled.TouchableHighlight``;
const WorkoutButtonImg = styled.Image``;

export default props => {
  return (
    <Workout>
      <WorkoutInfo>
        <WorkoutTitle>{props.data.name}</WorkoutTitle>
        <MuscleScroll horizontal={true} />
      </WorkoutInfo>
      <WorkoutActions>
        <WorkoutButton>
          <WorkoutButtonImg />
        </WorkoutButton>
      </WorkoutActions>
    </Workout>
  );
};
