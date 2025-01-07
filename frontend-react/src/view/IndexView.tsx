import { NavLink } from "react-router-dom";
import Title from "../components/Title";

export default function IndexView() {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center">
      <Title title="Hello to YourWallet"/>
      <div className="py-8">
        <NavLink
          to="/registration"
          className="bg-black text-white rounded border border-solid border-black px-4 py-2 transition hover:bg-white hover:text-black"
        >
          Registration
        </NavLink>
      </div>
    </div>
  );
}
