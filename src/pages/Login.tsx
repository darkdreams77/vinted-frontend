import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Input } from "../components/atoms/Input";
import { postLogin } from "../services/postLogin";
import { refresh } from "../helpers/refresh";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const userToConnect = {
      email,
      password,
    };

    const connectedUser = await postLogin(userToConnect);

    if (connectedUser) {
      Cookies.set("oauth.access.token", connectedUser.token, { expires: 7 });
      navigate("/");
      refresh();
    }
  };

  return (
    <div className="mt-20 w-sm mx-auto">
      <h1 className="text-3xl mb-20 text-center">Se connecter</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          required
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          name="password"
          id="password"
          required
          value={password}
          onChange={onChangePassword}
        />

        <button type="submit" className="button filled w-full py-4">
          Se connecter
        </button>
      </form>
    </div>
  );
};
