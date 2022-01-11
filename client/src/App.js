import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/auth/auth.actions.js";
import Header from "./components/header/Header.component.jsx";
import Landing from "./components/landing/Landing.component.jsx";
import Dashboard from "./components/dashboard/Dashboard.component.jsx";
import SurveyNew from "./components/surveys/SurveyNew.component.jsx";

function App() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(fetchUser());
	}, []);
	return (
		<BrowserRouter>
			<div className="container">
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/surveys" element={<Dashboard />} />
					<Route path="/surveys/new" element={<SurveyNew />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
