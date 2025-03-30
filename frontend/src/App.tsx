import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Hello from "./components/Hello";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp navigate={(path) => (window.location.href = path)} />} />
          <Route path="/signin" element={<SignIn navigate={(path) => (window.location.href = path)} />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
