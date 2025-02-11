import { NavLink } from "react-router-dom";

interface LinkProps {
  name: string
}

export default function LinkTo({ name }: LinkProps) {
    return (
        <NavLink
          to={ name }
          className="w-40 text-center bg-black text-white rounded border border-solid border-black px-4 py-2 transition hover:bg-white hover:text-black"
        >
          { name[0].toUpperCase() + name.slice(1) }
        </NavLink>
    )
}