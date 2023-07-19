import { useLocation } from 'react-router-dom';
const Home = () =>{
    const location = useLocation()
    const{email, password} = location.state
    return(
    <div>
    <h1>home</h1>
    <h2>{email}</h2>
    <h3>{password}</h3>
    </div>
    )
}
export default Home