import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectFinalAuth = createSelector([selectAuth], (auth) => auth);
