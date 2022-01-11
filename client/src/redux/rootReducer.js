import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./auth/auth.reducer";
import surveyReducer from "./user/user.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	surveys: surveyReducer,
	form: reduxForm,
});

export default rootReducer;
