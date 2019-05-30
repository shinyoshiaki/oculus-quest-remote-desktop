import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";

import server from "./server";

server();

ReactDOM.render(<App />, document.getElementById("root"));
