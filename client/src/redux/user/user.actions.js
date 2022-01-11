import axios from "axios";
import { FETCH_SURVEYS } from "./user.types";

export const fetchSurveys = () => async (dispatch) => {
	const res = await axios.get("/api/surveys");
	dispatch({
		type: FETCH_SURVEYS,
		payload: res.data,
	});
};
