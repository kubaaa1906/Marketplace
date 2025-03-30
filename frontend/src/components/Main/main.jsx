
const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return(
        <div>
            Strona główna testowa :)
            <button onClick={handleLogout}> Wyloguj się </button>
        </div>
    )
}

export default Main;