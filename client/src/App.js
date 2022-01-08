import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/auth/auth.actions.js";
import Header from "./components/Header.component.jsx";
import Landing from "./components/Landing.component.jsx";

function Survey() {
	return <div>Survey</div>;
}

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
					<Route path="/surveys" element={<Survey />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
