import { useRef } from "react";
import "./Signup.css";

const Signup = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const signup = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/api/v1/signup";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) throw data.error;

      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    signup(userInfo, setCurrUser);
    e.target.reset();
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div className="signup-container">
      <form ref={formRef} onSubmit={handleSubmit} className="signup-form">
        Email:{" "}
        <input type="email" name="email" placeholder="Enter your email" />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <br />
      <div>
        Already registered,{" "}
        <a href="#login" onClick={handleClick}>
          Login
        </a>{" "}
        here.
      </div>
    </div>
  );
};
export default Signup;
