import {Route, Routes, Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import ProtectRoutes from "./security/protectRoutes";

import Main from "./components/Main/main";
import Signup from "./components/SingUp/signup";
import Login from "./components/Login/login";
import MyAccount from "./components/MyAccount/myAccount";

function App() {
    const token = localStorage.getItem("token");
    //const decodedRole = token ? jwtDecode(token).role : null;

    return (
        <Routes>
        { token ? (
            <>
                <Route path="/" exact element={<Main />}/>
                <Route path="/myaccount" exact element={<MyAccount />}/>
            </>
            ) :
            (
            <>
                <Route path="/signup" exact element={<Signup />}/>
                <Route path="/login" exact element={<Login />}/>
                <Route path="/" exact element={<Main />}/>
            </>
        )

        }


        </Routes>
    );
}

export default App;
