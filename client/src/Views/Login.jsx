import { useState } from "react";
import Button from "../Components/Button";
import TextInput from "../Components/TextInput";
import { useLogin } from "../Hooks/useLogin";
import Error from "../Components/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, clearError } = useLogin();

  const handleChange = (e, upateState) => {
    upateState(e.target.value);
    if (error !== null) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    await login(email, password);
    console.log(error);
  };

  return (
    <section className="flex flex-col justify-evenly items-center w-[90%] h-[80%] ">
      <h1 className=" text-5xl text-slate-50 font-roboto text-center mx-4 md:text-6xl xl:text-7xl">
        LOGIN
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center justify-between py-5 px-2 border-slate-50 border-4 rounded-2xl border-solid max-w-[390px] xl:max-w-[500px] xl:py-8"
      >
        <TextInput
          className=""
          placeholder="E-mail"
          change={(e) => {
            handleChange(e, setEmail);
          }}
          value={email}
        />
        <TextInput
          className=""
          placeholder="Password"
          change={(e) => {
            handleChange(e, setPassword);
          }}
          value={password}
          type="password"
        />
        <Button
          theme="primary"
          classname=""
          handler={() => {
            // alert(email);
          }}
        >
          LOGIN
        </Button>
        {error && <Error>{error}</Error>}
      </form>
    </section>
  );
};

export default Login;
