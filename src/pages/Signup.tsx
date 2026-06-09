import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Checkbox } from "../components/atoms/Checkbox";
import { Input } from "../components/atoms/Input";
import { InputFileAvatar } from "../components/atoms/InputFileAvatar";
import { postSignup } from "../services/postSignup";

export const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptingNewsletter, setAcceptingNewsletter] = useState(false);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onChangeNewsletter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setAcceptingNewsletter(value);
  };

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files;
    if (value) setAvatar(value[0]);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = e.target;
    const formData = new FormData(data);

    const createdUser = await postSignup(formData);

    if (createdUser) {
      Cookies.set("oauth.access.token", createdUser.token, { expires: 7 });
      navigate("/");
    }
  };

  return (
    <div className="mt-20 w-100 mx-auto">
      <h1 className="text-3xl mb-20 text-center">S'inscrire</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          id="username"
          required
          value={username}
          onChange={onChangeUsername}
        />
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

        <InputFileAvatar
          id="avatar"
          name="avatar"
          onChange={onChangeAvatar}
          avatar={avatar}
        />

        <Checkbox
          label="S'inscrire à notre newsletter"
          id="acceptingNewsletter"
          name="acceptingNewsletter"
          checked={acceptingNewsletter}
          onChange={onChangeNewsletter}
        />

        <span className="text-zinc-400 text-left inline-block mt-4 text-xs mb-6">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </span>

        <button type="submit" className="button filled w-full py-4">
          S'inscrire
        </button>

        <div className="mt-8 text-lagoon-500 text-sm text-center">
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
      </form>
    </div>
  );
};
