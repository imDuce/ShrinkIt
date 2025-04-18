import React from "react";
import NavbarLinks from "./NavbarLinks";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-900">
      <div className="container p-2 mx-auto">
        <nav className="py-5 px-3 flex justify-between items-center">
          <div className="text-white text-3xl">
            <Link to='/'>ShrinkIt</Link>
          </div>
          <NavbarLinks />
        </nav>
      </div>
    </div>
  );
};

export default Header;
