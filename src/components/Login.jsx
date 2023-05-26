import { useState } from "react";
import login from "../services/login";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser, setToken }) => {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ username, password }).then((res) => res);
      console.log(user);
      if (user) {
        setUser(user);
        setToken(user.token);
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="bg-purpuraoscuro flex justify-center items-center w-screen h-screen overflow-y-auto">
      <div className="bg-blanco shadow-login shadow-negropurpura h-5/6 w-[40%] flex flex-col items-center">
        <div className="text-4xl font-bold pt-16">
          <Link to="/">TVSHOW MANAGER</Link>
        </div>
        <div className="flex justify-around flex-col items-center h-full">
          <form onSubmit={handleLogin} className="">
            <div className="flex gap-y-5 flex-col">
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-[18px] font-semibold">Username</label>
                <input
                  className="px-2 py-1 border-2 border-purpuraoscuro"
                  placeholder="Your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <label className="text-[18px] font-semibold">Password</label>
                <input
                  type="password"
                  className="px-2 py-1 border-2 border-purpuraoscuro"
                  placeholder="Your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex pt-2 h-[27.5px] text-rojo font-sans flex-col text-[13px] font-semibold items-center">
              {error ? error.response.data.message : " "}
            </div>
            <div className="items-center mt-10 flex flex-col justify-center">
              <button className="bg-gris hover:bg-purpuraoscuro hover:text-lavanda text-negropurpura px-7 py-[5px] text-xl font-bold border-2 border-purpuraoscuro">
                Login
              </button>
              <span className="text-[13px] mt-2 font-semibold font-sans">
                Forgot your password?
              </span>
            </div>
          </form>
          <div>
            <span>Create a new account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
