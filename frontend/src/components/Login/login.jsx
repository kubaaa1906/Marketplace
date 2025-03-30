import {use, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const onChange = ({currentTarget: input}) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8085/api/users";
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error){
            if(error){
                setError(error.response.data.message);
            }
        }
    }

    return(
        <div>
            <h1> Zaloguj się </h1>
            <form>
                <input
                    type="text"
                    placeholder="Nazwa użytkownika"
                    name="username"
                    onChange={onChange}
                    value={data.username}
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    name="password"
                    onChange={onChange}
                    value={data.password}
                    required
                />
                {error && <div>{error}</div>}
                <button type="submit"> Zaloguj się </button>
            </form>
        </div>
    )

}

export default Login;