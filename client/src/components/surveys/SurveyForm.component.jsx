import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField.component";
import mailValidator from "../../utils/mail.validator";
import FIELDS from "../../utils/fields.js";

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {
	const renderFields = () => {
		return (
			<div>
				{FIELDS.map(({ label, name }) => (
					<Field
						key={name}
						label={label}
						type="text"
						name={name}
						component={SurveyField}
					/>
				))}
			</div>
		);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSurveySubmit)}>
				{renderFields()}
				<Link to="/surveys" className="red btn-flat white-text">
					Cancel
				</Link>
				<button type="submit" className="teal btn-flat right white-text">
					Next
					<i className="material-icons right">done</i>
				</button>
			</form>
		</div>
	);
};

function validate(values) {
	const errors = {};
	errors.recipients = mailValidator(values.recipients || "");
	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a ${name}`;
		}
	});

	return errors;
}

export default reduxForm({
	form: "surveyForm",
	destroyOnUnmount: false,
	validate,
})(SurveyForm);
