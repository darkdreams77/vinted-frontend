import { useState } from "react";
import {
  Link,
  matchPath,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { TbCameraPlus, TbSearch } from "react-icons/tb";
import Cookies from "js-cookie";

import { Container } from "./Container";
import { Toggle } from "./Toggle";
import { Range } from "./Range";

import { useAuthenticated } from "../../hooks/useAuthenticated";
import { refresh } from "../../helpers/refresh";
import logo from "../../assets/img/logo.svg";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isConnected = useAuthenticated();
  const [searchParams, setSearchParams] = useSearchParams();

  const match = matchPath("/", location.pathname);

  const signup = () => navigate("/signup");
  const login = () => navigate("/login");
  const publish = () => navigate("/publish");

  const unregister = () => {
    Cookies.remove("oauth.access.token");
    if (match) refresh();
    else navigate("/");
  };

  const [title, setTitle] = useState("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("title", e.target.value);

    setSearchParams(nextSearchParams);
  };

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
              name="title"
              id="title"
              className="w-full focus:focus-ring"
              placeholder="Rechercher un article ou un membre"
              value={title}
              onChange={onChangeTitle}
            />
            <button className="cursor-pointer">
              <TbCameraPlus className="text-lagoon-500" size={24} />
            </button>
          </div>
          {isConnected ? (
            <button className="button outlined text-xs" onClick={unregister}>
              Se déconnecter
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="button outlined text-xs" onClick={signup}>
                S'inscrire
              </button>
              <button className="button outlined text-xs" onClick={login}>
                Se connecter
              </button>
            </div>
          )}
          <button className="button filled text-xs" onClick={publish}>
            Vends tes articles
          </button>
        </Container>
      </div>
      {/* bottom header */}
      {match && (
        <div>
          <Container className="flex items-center justify-between py-2">
            <div className="flex gap-2">
              <Toggle label="Trier par prix : " />
            </div>
            <div className="flex justify-center w-1/2 mt-4 flex-nowrap gap-6">
              <Range label="Prix entre : " />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
