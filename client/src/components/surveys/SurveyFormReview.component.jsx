import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitSurvey } from "../../redux/auth/auth.actions.js";
import FIELDS from "../../utils/fields.js";

const SurveyFormReview = ({ onCancel }) => {
	const formValues = useSelector((state) => state.form.surveyForm.values);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const reviewFields = FIELDS.map(({ name, label }) => (
		<div key={name}>
			<label>{label}</label>
			<div>{formValues[name]}</div>
		</div>
	));
	return (
		<div>
			<h5>please confirm your fields</h5>
			{reviewFields}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}>
				Back
			</button>
			<button
				onClick={() => dispatch(submitSurvey(formValues, navigate))}
				className="green btn-flat white-text right">
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

export default SurveyFormReview;
