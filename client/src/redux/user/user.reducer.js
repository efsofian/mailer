import { FETCH_SURVEYS } from "./user.types";

const surveyReducer = function (state = [], action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
};

export default surveyReducer;
