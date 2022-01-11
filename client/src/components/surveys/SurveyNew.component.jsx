import React from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm.component";
import SurveyFormReview from "./SurveyFormReview.component";

const SurveyNew = () => {
	const [showReview, setshowReview] = React.useState(false);
	const renderContent = () =>
		!showReview ? (
			<SurveyForm onSurveySubmit={() => setshowReview(true)} />
		) : (
			<SurveyFormReview onCancel={() => setshowReview(false)} />
		);
	return <div>{renderContent()}</div>;
};

export default reduxForm({
	form: "surveyForm",
})(SurveyNew);
