import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import register from "../services/register";
const Register = () => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [registered, setRegistered] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const user = await register({ name, username, password }).then(
        (res) => res
      );
      if (user.status === 200) {
        setRegistered(user.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setRegistered(error.response.data.error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-purpuraoscuro">
      <div className="h-5/6 w-[40%] flex flex-col shadow-login shadow-negropurpura justify-evenly items-center bg-blancoblanco">
        <div className="text-4xl pt-8 font-bold ">
          <Link to="/">TVSHOW MANAGER</Link>
        </div>
        <form className="flex flex-col pb-10 justify-center items-center">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1 justify-center items-center">
              <label className="text-xl font-semibold">Name</label>
              <input
                required
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <label className="text-xl font-semibold">Username</label>
              <input
                required
                onChange={(e) => setUsername(e.target.value)}
                className="px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                type="text"
                placeholder="Your username"
              />
            </div>

            <div className="flex flex-col gap-y-2 justify-center items-center">
              <label className="text-xl font-semibold">Password</label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                type="password"
                placeholder="Your password"
              />
            </div>
          </div>
          <div className="h-5 flex justify-center items-center">
            {registered ? (
              <p className="font-semibold pt-5">{registered}</p>
            ) : null}
          </div>
          <button
            onClick={(e) => handleRegister(e)}
            className="bg-gris mt-10 hover:bg-purpuraoscuro hover:text-lavanda text-negropurpura px-7 py-[5px] text-xl font-bold border-2 border-purpuraoscuro"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col justify-center items-center">
          <h3>Already have an account?</h3>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
