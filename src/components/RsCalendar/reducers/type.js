const initialState = 'week';

export function type(state = initialState, action) {
  if (action.type === 'CHANGE_TYPE') {
    return action.nextType;
  }
  return state;
}

export default type;
