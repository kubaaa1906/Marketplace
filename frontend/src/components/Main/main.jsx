import {Link} from "react-router-dom";

const Main = () => {
    const token = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }


    return(
        <div>

            {token ? (
                <div>
                    <button> Dodaj ogłoszenie </button>
                    <button> <Link to="/myaccount">Moje konto </Link> </button>
                    <button onClick={handleLogout}> Wyloguj się </button>
                </div>
            ) : (
                <button> <Link to="/login">Zaloguj się</Link> </button>
            )
            }
            Strona główna testowa :)
        </div>
    )
}

export default Main;