import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-evenly items-center h-[80%] max-w-[330px] md:max-w-[400px] lg:max-w-[700px] ">
      <h1 className=" text-5xl text-slate-50 font-roboto text-center mx-4 ">
        Welcome to Home Storage
      </h1>
      <div className="flex flex-col w-full items-center justify-between">
        <Button
          theme="primary"
          classname="md:max-w-[300px] md:text-xl"
          handler={() => {
            navigate("/login");
          }}
        >
          LOGIN
        </Button>

        <Button
          theme="primary"
          classname="md:max-w-[300px] md:text-xl"
          handler={() => {
            navigate("/signup");
          }}
        >
          SIGNUP
        </Button>
      </div>
    </section>
  );
};

export default Welcome;
