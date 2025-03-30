import React, { Component } from "react";
import { signUp } from "../api/api";
import { Link } from "react-router-dom";

interface SignUpState {
  name: string;
  email: string;
  password: string;
  errors: { name: string; email: string; password: string };
  generalError: string;
}

class SignUp extends Component<{ navigate: (path: string) => void }, SignUpState> {
  state: SignUpState = {
    name: "",
    email: "",
    password: "",
    errors: { name: "", email: "", password: "" },
    generalError: "",
  };

  validateField = (name: string, value: string): string => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name === "name" && value.length < 3) {
      error = "Name must be at least 3 characters long.";
    }
    if (name === "email" && !emailRegex.test(value)) {
      error = "Invalid email format.";
    }
    if (name === "password" && !passwordRegex.test(value)) {
      error = "Password must be at least 8 characters, contain one letter, one number, and one special character.";
    }

    return error;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error: string = this.validateField(name, value);
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...prevState.errors, [name]: error },
    }));
  };

  handleSignUp = async () => {
    const { name, email, password, errors } = this.state;
    if (errors.name || errors.email || errors.password) return;

    const data = await signUp(name, email, password);

    if (data.success) {
      this.props.navigate("/signin");
    } else {
      this.setState({ generalError: data.message });
    }
  };

  render() {
    const { name, email, password, errors, generalError } = this.state;
    const isFormValid = !errors.name && !errors.email && !errors.password && name && email && password;

    return (
      <div>
        <h2>Sign Up</h2>
        {generalError && <p style={{ color: "red" }}>{generalError}</p>}
        
        <div>
          <input name="name" placeholder="Name" value={name} onChange={this.handleChange} />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <input name="email" placeholder="Email" value={email} onChange={this.handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <input name="password" type="password" placeholder="Password" value={password} onChange={this.handleChange} />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button onClick={this.handleSignUp} disabled={!isFormValid}>Sign Up</button>

        <p>Already have an account?</p>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    );
  }
}

export default SignUp;
