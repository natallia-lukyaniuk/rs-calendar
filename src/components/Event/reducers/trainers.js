export function trainers(state = [], action) {
  if (action.type === 'FETCH_TRAINERS_SUCCESS') {
    return action.trainers;
  }
  return state;
}

export default trainers;
