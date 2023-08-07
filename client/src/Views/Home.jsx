import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faRightFromBracket,
  faBarcode,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";

const Home = () => {
  const { logout } = useLogout();

  const handleLoguot = () => {
    logout();
  };

  return (
    <section className="flex flex-wrap items-center gap-3 p-4 max-w-[375px] md:max-w-[580px] md:gap-5 lg:max-w-[600px] lg:gap-6 xl:max-w-[700px]">
      <Link to="/storage">
        <div className="flex flex-col relative border-2 w-[105px] h-[105px] p-2 border-solid border-slate-50 rounded-lg md:w-[120px] md:h-[120px] xl:w-[140px] xl:h-[140px] xl:p-3">
          <FontAwesomeIcon icon={faBox} className="text-slate-50 h-4/5" />
          <p className="z-10  text-slate-50 text-center text-lg font-bold xl:text-xl ">
            Storage
          </p>
        </div>
      </Link>
      <Link to="/add">
        <div className="flex flex-col relative border-2 w-[105px] h-[105px] p-2 border-solid border-slate-50 rounded-lg md:w-[120px] md:h-[120px] xl:w-[140px] xl:h-[140px]">
          <FontAwesomeIcon
            icon={faPlusSquare}
            className="text-slate-50 h-4/5"
          />
          <p className="z-10  text-slate-50 text-center text-lg font-bold xl:text-xl ">
            Add
          </p>
        </div>
      </Link>
      <Link to="/scan">
        <div className="flex flex-col relative border-2 w-[105px] h-[105px] p-2 border-solid border-slate-50 rounded-lg md:w-[120px] md:h-[120px] xl:w-[140px] xl:h-[140px]">
          <FontAwesomeIcon icon={faBarcode} className="text-slate-50 h-4/5" />
          <p className="z-10  text-slate-50 text-center text-lg font-bold xl:text-xl ">
            Scan
          </p>
        </div>
      </Link>
      <button onClick={handleLoguot}>
        <div className="flex flex-col relative border-2 w-[105px] h-[105px] p-2 border-solid border-slate-50 rounded-lg md:w-[120px] md:h-[120px] xl:w-[140px] xl:h-[140px]">
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="text-slate-50 h-4/5"
          />
          <p className="z-10  text-slate-50 text-center text-lg font-bold xl:text-xl ">
            Logout
          </p>
        </div>
      </button>
    </section>
  );
};

export default Home;
