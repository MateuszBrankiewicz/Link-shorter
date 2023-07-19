import Input from "../components/inputs";
import Button from "../components/button";
import "../styles/registerPage.css";
import { ChangeEvent, useState } from "react";
import { Router } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Use state for errorMessage

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  function checkPassword(password: string): boolean {
    const hasUpperCaseLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCaseLetter && hasSpecialCharacter && hasNumber;
  }

  const signUpFunction = () => {
    console.log(userName, email, password, repeatPassword);

    if (email !== "" && password !== "") {
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setErrorMessage("Invalid email");
      } else if (password.length <= 6) {
        setErrorMessage("Password must have at least 7 characters");
      } else if (!checkPassword(password)) {
        setErrorMessage("Password must contain at least one uppercase letter, one special character, and one number");
      } else if (password !== repeatPassword) {
        setErrorMessage("Passwords do not match");
      } else {
        const userData = {
          userName: userName,
          email: email,
          password: password
        };
        fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
          .then(response => {
            if (response.ok) {
              console.log("is ok");
            } else {
              console.log("Error signing up");
              setErrorMessage("Error signing up"); // Set error message for failed sign up
            }
          })
          .catch(error => {
            console.log("Error signing up:", error);
            setErrorMessage("Error signing up: " + error); // Set error message for catch error
          });
      }
    } else if (userName !== "") {
      setErrorMessage("Please enter a username");
    } else if (repeatPassword !== "") {
      setErrorMessage("Please repeat the password");
    } else if (email !== "") {
      setErrorMessage("Please enter a password");
    } else if (password !== "") {
      setErrorMessage("Please enter an email");
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };

  return (
    <div id="registerbar">
      <h3>Register</h3>
      <div id="form">
        <Input option="text" msg="Enter username" onChange={handleUsernameChange} inputValue={userName} />
        <p>{errorMessage}</p>
        <Input option="text" msg="Enter email" onChange={handleEmailChange} inputValue={email} />
        <p>{errorMessage}</p>
        <Input option="password" msg="Enter password" onChange={handlePasswordChange} inputValue={password} />
        <p>{errorMessage}</p>
        <Input option="password" msg="Repeat password" onChange={handleRepeatPasswordChange} inputValue={repeatPassword} />
        <p>{errorMessage}</p>
        <Button onClick={signUpFunction} msg={"Sign up"}></Button>
      </div>
    </div>
  );
};

export default RegisterPage;
