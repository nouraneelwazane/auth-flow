import { Component } from "react";
import { getUserData } from "../api/api";

class Hello extends Component {
  state = { name: "", error: "" };

  async componentDidMount() {
    const token = localStorage.getItem("authToken") || "";
    const data = await getUserData(token);
    
    if (data.name) {
      this.setState({ name: data.name });
    } else {
      this.setState({ error: data.message });
    }
  }

  render() {
    return <h2>{this.state.error || `Welcome to the application, ${this.state.name}`}</h2>;
  }
}

export default Hello;
