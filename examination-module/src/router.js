import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Index = () => <h2>Home</h2>;
const Result = () => <h2>Result</h2>;

const AppRouter = () => (
    <Router>
        <Route path="/" exact component={Examine} />
        <Route path="/result/" component={Result} />
    </Router>
);

export default AppRouter;