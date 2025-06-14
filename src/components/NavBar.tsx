import { Link } from "react-router-dom";

const NavBar = ()=>{
    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
        </nav>
    );
}


export default NavBar;