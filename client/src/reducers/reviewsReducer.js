import { GET_REVIEWS } from "../actions/types";

export default function(state = [], action) {
  // console.log(action);
  switch (action.type) {
    case GET_REVIEWS:
      return action.payload;
    default:
      return state;
  }
}
