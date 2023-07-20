import { useLocation } from 'react-router-dom';
import Input from '../components/inputs';
import { ChangeEvent, useState } from 'react';
import Button from '../components/button';
import { METHODS } from 'http';
import { error } from 'console';
const Home = () =>{
    const [url,setUrlValue] = useState("")
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setUrlValue(event.target.value)
    }
    const gettedUrl = '';
    const gettedShortUrl = ''
    const getData = {
        url: gettedUrl,
        shortUrl: gettedShortUrl
    }
    const createUrl = () =>{
        console.log(email)
        if(url !== ""){
            const data = {
                email : email,
                url : url
            }
            fetch("http://localhost:5000/api/home/create", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else{
                    throw new Error('Network response was not ok')
                }
            })
            .then(getData =>{
                console.log(getData)
            })
            .catch(error=>{
                console.error("Fetch error:", error)
            })
        }
    }
    const location = useLocation()
    const{email, password} = location.state
    return(
    <div>
        <Input msg='Enter a url' onChange={handleInputChange} inputValue={url} option='text'/>
        <Button onClick={createUrl} msg="Create url"/>
    </div>
    )
}
export default Home