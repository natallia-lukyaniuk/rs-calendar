export function event(state = {}, action) {
  if (action.type === 'FETCH_EVENT_SUCCESS') {
    return action.event;
  }
  return state;
}

export default event;
