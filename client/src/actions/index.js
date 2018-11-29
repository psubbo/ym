import axios from "axios";
import { FETCH_USER, GET_REVIEWS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const getReviews = () => async dispatch => {
  const res = await axios.get("/api/get_reviews");
  dispatch({
    type: GET_REVIEWS,
    payload: res.data.reviews
  });
};
