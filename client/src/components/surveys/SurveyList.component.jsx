import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSurveys } from "../../redux/user/user.actions";

const SurveyList = () => {
	const surveys = useSelector((state) => state.surveys);
	const dispatch = useDispatch();
	const renderSurvey = () => {
		return surveys.map((survey) => {
			return (
				<div key={survey._id} className="card darken-1">
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On: {new Date(survey.dateSent).toLocaleDateString()}
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			);
		});
	};
	React.useEffect(() => {
		dispatch(fetchSurveys());
	}, []);

	return <div>{renderSurvey()}</div>;
};

export default SurveyList;
