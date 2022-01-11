import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Payment from "../payment/Payment.component";

const Header = () => {
	const auth = useSelector((state) => state.auth);
	const renderContent = () => {
		switch (auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return [
					<li key="1">
						<Payment />
					</li>,
					<li key="2" style={{ margin: "0 10px" }}>
						Credits: {auth.credits}
					</li>,
					<li key="3">
						<a href="/api/logout">Logout</a>
					</li>,
				];
		}
	};
	return (
		<nav>
			<div className="nav-wrapper">
				<Link to={auth ? "/surveys" : "/"} className="left brand-logo">
					Emaily
				</Link>
				<ul className="right">{renderContent()}</ul>
			</div>
		</nav>
	);
};

export default Header;
