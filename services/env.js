if (process.env.NODE_ENV == "development") {
	require("dotenv").config({ path: "./.env.dev" });
} else if (process.env.NODE_ENV == "production") {
	require("dotenv").config({ path: "./.env.prod" });
}
