// OauthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthUser";

const OauthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const loginOauth = async()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const userParam = urlParams.get("user");


        if (token && userParam) {
            const user = JSON.parse(decodeURIComponent(userParam));
            await login(token, user);
            navigate("/");
        } else {
            navigate("/login"); 
        }
    }


    loginOauth()
  }, []);

  return <p>Logando com Google...</p>;
};

export default OauthSuccess;
