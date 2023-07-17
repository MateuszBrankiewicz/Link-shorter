import Input from "../components/inputs"
import Button from "../components/button"
import "../styles/registerPage.css"

const RegisterPage = () =>{
    return(
        <div id="registerbar">  
            <h3>Register </h3>
            <div id="form">
                <Input option="text" msg="Enter username" />
                <Input option="text" msg = "Enter email"  ></Input>
                <Input option="password" msg="Enter password"></Input>
                <Input option="password" msg = "Repeat password"></Input>
                <Button msg={"Sign up"}></Button>
                
            </div>
        </div>
    )
}
export default RegisterPage
