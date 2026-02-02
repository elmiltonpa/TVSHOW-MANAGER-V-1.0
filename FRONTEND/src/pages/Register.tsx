import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import register from "../services/register";
import { AxiosError } from "axios";

interface RegisterErrorResponse {
  error: string;
}

const Register = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registered, setRegistered] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register - TvShowManager";
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await register({ name, username, password });
      if (user.status === 200) {
        setRegistered(user.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<RegisterErrorResponse>;
      setRegistered(err.response?.data?.error || "Error al registrar");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-purpuraoscuro px-3">
      <div className="min-h-[600px] w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] flex flex-col shadow-login shadow-negropurpura justify-evenly items-center bg-blancoblanco py-8">
        <div className="text-2xl sm:text-3xl md:text-4xl pt-4 sm:pt-8 font-bold text-center px-4">
          <Link to="/">TVSHOW MANAGER</Link>
        </div>
        <form className="flex flex-col pb-6 sm:pb-10 justify-center items-center w-full px-4 sm:px-8">
          <div className="flex flex-col gap-y-3 w-full max-w-md">
            <div className="flex flex-col gap-y-1 justify-center items-center">
              <label className="text-lg sm:text-xl font-semibold">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                type="text"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-y-2 justify-center items-center">
              <label className="text-lg sm:text-xl font-semibold">Username</label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                type="text"
                placeholder="Your username"
              />
            </div>

            <div className="flex flex-col gap-y-2 justify-center items-center">
              <label className="text-lg sm:text-xl font-semibold">Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1 border-2 focus:shadow-input focus:shadow-purpuraoscuro border-purpuraoscuro"
                type="password"
                placeholder="Your password"
              />
            </div>
          </div>
          <div className="h-5 flex justify-center items-center">
            {registered ? (
              <p className="font-semibold pt-5 text-sm sm:text-base text-center">{registered}</p>
            ) : null}
          </div>
          <button
            onClick={(e) => handleRegister(e)}
            className="bg-gris mt-10 hover:bg-purpuraoscuro hover:text-lavanda text-negropurpura w-full max-w-md py-[5px] text-lg sm:text-xl font-bold border-2 border-purpuraoscuro"
          >
            Register
          </button>
        </form>
        <div className="flex flex-col justify-center items-center pb-4">
          <h3 className="text-sm sm:text-base">Already have an account?</h3>
          <Link
            className="hover:bg-purpuraoscuro hover:text-lavanda px-2 pb-1 font-semibold text-sm sm:text-base"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;