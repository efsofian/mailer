import { FETCH_USER } from "./auth.types";
import { FETCH_SURVEYS } from "./auth.types";

const authReducer = function (state = "", action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
};

export default authReducer;
