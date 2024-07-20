import React, { useState } from "react";
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from "../../firebase";
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading]=useState(false);

    const user_auth=async(event)=>{
        event.preventDefault();
        setLoading(true);
        if(signState==="Sign In"){
            await login(email,password);
        }
        else{
            await signup(name,email,password);
        }
        setLoading(false);
    }
    return (
        loading?<div className="netflix-spinner">
            <img src={netflix_spinner} alt="" />
        </div>:
        <div className="login">
            <img src={logo} className="login-logo" alt="Logo" />
            <div className="login-form">
                <h1>{signState}</h1>
                <form>

                    {signState === "Sign Up" ? 
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            placeholder="Your name" 
                        /> 
                    : <></>}
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email" 
                    />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                    />

                    <button type="submit" onClick={user_auth}>{signState}</button>
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </div>
                        <p>Need Help?</p>
                    </div>
                </form>
                <div className="form-switch">
                    {signState === "Sign In" ? (
                        <p>
                            New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign up now</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account? <span onClick={() => setSignState("Sign In")}>Sign in now</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
