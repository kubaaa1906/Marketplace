import {data, Link, useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";
import axios, {AxiosHeaders, head} from "axios";
import {use, useEffect, useState} from "react";
import config from "bootstrap/js/src/util/config";

const MyAccount = () => {
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    const handleGetUser = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if(token){
            try{
                const config = {
                    method: 'get',
                    url: 'http://localhost:8083/api/users/me',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                }

                const {data: res} = await axios(config);
                setUser(res)
                console.log(user)
            } catch (error){
                if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    setError(error.response.data.message);
                }
            }
        }
    }


    useEffect(() => {
        handleGetUser();
    }, []);

    return(
        <div>
            {user ? (
                <h1> Witaj, {user.username} </h1>
            ) : (
                <p></p>
            )}
            <button onClick={handleLogout}> Wyloguj się </button>
            Tu będzie stronka do edycji profilu itp.
        </div>
    )

}
export default MyAccount;