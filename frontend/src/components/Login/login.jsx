import {use, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    let navigate = useNavigate();

    const onChange = ({currentTarget: input}) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8083/api/users/login";
            const {data: res} = await axios.post(url, data);
            console.log(data)
            localStorage.setItem("token", res.data);
            navigate("/");
        } catch (error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message);
            }
        }
    }

    return(
        <div>
            <h1> Zaloguj się </h1>
            <form onSubmit={handleSubmit}>
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