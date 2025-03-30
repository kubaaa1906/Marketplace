import {use, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [data, setData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        location: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = ({currentTarget: input}) => {
        setData({ ...data, [input.name]: input.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8085/api/users";
            const {data: res} = await axios.post(url, data);
            navigate("/");
            console.log(res.message);
        } catch (error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message);
            }
        }
    }

    return(
        <div>
            <h1>Załóż konto </h1>
            <div>
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
                        type="text"
                        placeholder="Imię"
                        name="firstName"
                        onChange={onChange}
                        value={data.firstName}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nazwisko"
                        name="lastName"
                        onChange={onChange}
                        value={data.lastName}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Adres email"
                        name="email"
                        onChange={onChange}
                        value={data.email}
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
                    <input
                        type="number"
                        placeholder="Numer telefonu"
                        name="phoneNumber"
                        onChange={onChange}
                        value={data.phoneNumber}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Lokalizacja"
                        name="location"
                        onChange={onChange}
                        value={data.location}
                        required
                    />
                    {error && <div>{error}</div>}
                    <button type="submit"> Załóż konto</button>
                </form>
            </div>
        </div>
    )

}

export default Signup