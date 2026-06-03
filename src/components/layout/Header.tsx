import { Link, matchPath, useLocation } from "react-router-dom";
import { TbCameraPlus, TbSearch } from "react-icons/tb";

import { Container } from "./Container";

import logo from "../../assets/img/logo.svg";

export const Header = () => {
  const location = useLocation();
  const match = matchPath("/", location.pathname);

  return (
    <header className="sticky">
      {/* top header */}
      <div className="border-b border-b-zinc-100">
        <Container className="flex items-center justify-between py-1">
          <Link to="/">
            <img src={logo} alt="Logo de Vinted" />
          </Link>
          <div className="flex bg-zinc-100 rounded-sm w-150 py-1 px-2 items-center gap-2">
            <TbSearch className="text-zinc-400" size={24} />
            <input
              type="text"
              name="search"
              id="search"
              className="w-full focus:focus-ring"
              placeholder="Rechercher un article ou un membre"
            />
            <button className="cursor-pointer">
              <TbCameraPlus className="text-lagoon-500" size={24} />
            </button>
          </div>
          <div className="flex gap-2">
            <button className="button outlined text-xs">S'inscrire</button>
            <button className="button outlined text-xs">Se connecter</button>
          </div>
          <button className="button filled text-xs">Vends tes articles</button>
        </Container>
      </div>
      {/* bottom header */}
      {match && (
        <div>
          <Container className="flex items-center justify-around py-2">
            <div>Trier par prix</div>
            <div>Prix entre</div>
          </Container>
        </div>
      )}
    </header>
  );
};
