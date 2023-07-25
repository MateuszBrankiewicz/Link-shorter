import Input from "../components/inputs"
import Button from "../components/button"
import "../styles/loginPage.css"
import { Link } from 'react-router-dom';
import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const LoginPage = () =>{
    const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [errorMessage, setErrorMessage] = useState("")
        const [redirectToHome, setRedirectToHome] = useState(false);
        const navigate = useNavigate();
        const handleEmailChange = (event : ChangeEvent<HTMLInputElement>) =>{
            setEmail(event.target.value);
        }
        const handlePasswordChange = (event : ChangeEvent<HTMLInputElement>) =>{
            setPassword(event.target.value);
        }
    
        const signIn =()=>{
        if(email !== "" && password !== ""){
            const data={
                email: email,
                password: password,
            }
            fetch("http://localhost:5000/api/login", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response =>{
                if(response.ok){
                    console.log('is ok');
                    setRedirectToHome(true)
                }
                else{
                    console.log("Error signing up")
                }
            })
        }
        else if(email !== ""){
            setErrorMessage("Please enter the password");
        }
        else{
            setErrorMessage("Please enter email and password");
        }
        if (redirectToHome) {
            navigate('/home', { state: { email, password } });
          }
        
    }

    return(
        <div id="main">
            <div id="info">
                <h2>Shorten and Simplify Your Links</h2>
            </div>
            
            <div id="form">
                <h3>Log In </h3>
                <Input inputValue={email} onChange={handleEmailChange} option="text" msg = "Enter email"  ></Input>
               
                <Input inputValue={password} onChange={handlePasswordChange} option="password" msg="Enter password"></Input>
                
                <Button onClick={signIn} msg={"Sign in"}></Button>
                <p>{errorMessage}</p>
                <p>Don't have account? <Link to = "/register">Register now</Link></p>
            </div>
        </div>
    )
}
export default LoginPage