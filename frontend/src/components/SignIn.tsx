import React, { Component } from "react";
import { signIn } from "../api/api";

class SignIn extends Component<{ navigate: (path: string) => void }> {
  state = { email: "", password: "", error: "" };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignIn = async () => {
    const { email, password } = this.state;
    const data = await signIn(email, password);
    
    if (data.accessToken) {
      localStorage.setItem("authToken", data.accessToken);
      this.props.navigate("/hello");
    } else {
      this.setState({ error: data.message });
    }
  };

  render() {
    return (
      <div>
        <h2>Sign In</h2>
        {this.state.error && <p style={{ color: "red" }}>{this.state.error}</p>}
        <input name="email" placeholder="Email" onChange={this.handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={this.handleChange} />
        <button onClick={this.handleSignIn}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;
