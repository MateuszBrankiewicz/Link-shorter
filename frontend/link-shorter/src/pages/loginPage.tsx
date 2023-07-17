import Input from "../components/inputs"
import Button from "../components/button"
import "../styles/loginPage.css"
import { Link } from 'react-router-dom';
const LoginPage = () =>{
    return(
        <div id="main">
            <div id="info">
                <h2>Shorten and Simplify Your Links</h2>
            </div>
            <h3>Log In </h3>
            <div id="form">
                <Input option="text" msg = "Enter email"  ></Input>
                <Input option="password" msg="Enter password"></Input>
                <Button msg={"Sign in"}></Button>
                <p>Don't have account? <Link to = "/register">Register now</Link></p>
            </div>
        </div>
    )
}
export default LoginPage