import { useState, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Input } from "../components/atoms/Input";
import { InputFileOffer } from "../components/atoms/InputFileOffer";
import { Textarea } from "../components/atoms/Textarea";
import { Checkbox } from "../components/atoms/Checkbox";
import { postOffer } from "../services/postOffer";
import { useToken } from "../hooks/useToken";

type PublishProps = {};

export const Publish = ({}: PublishProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useToken();

  if (!token) navigate(location.state.from ?? "/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<File | undefined>(undefined);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [price, setPrice] = useState("");
  const [wantSwitch, setWantSwitch] = useState(false);

  const onChangeOfferImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.files;
    if (value) setPicture(value[0]);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onChangeBrand = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
  };

  const onChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const onChangeCondition = (e: ChangeEvent<HTMLInputElement>) => {
    setCondition(e.target.value);
  };

  const onChangeLocalisation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalisation(e.target.value);
  };

  const onChangePaymentMode = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMode(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const onChangeWantSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setWantSwitch(value);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = e.target;
    const formData = new FormData(data);

    for (const entry of formData.entries()) {
      console.log("entry", entry);
    }

    try {
      const createdOffer = await postOffer(formData, token!);

      if (createdOffer) {
        navigate(`/offer/${createdOffer._id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="mt-20 w-200 mx-auto">
      <h1 className="text-3xl mb-20 text-center">Vends ton article</h1>

      <form onSubmit={handleSubmit}>
        <InputFileOffer
          id="picture"
          name="picture"
          picture={picture}
          onChange={onChangeOfferImg}
        />

        <div className="grid grid-cols-3 p-4 border border-zinc-200 mb-5">
          <Input
            label="Titre"
            type="text"
            placeholder="ex: Chemise Sézane verte"
            name="title"
            id="title"
            required
            value={title}
            onChange={onChangeTitle}
          />

          <Textarea
            label="Description"
            placeholder="ex: porté quelques fois, taille correctement"
            name="description"
            id="description"
            required
            value={description}
            onChange={onChangeDescription}
          />
        </div>

        <div className="grid grid-cols-3 p-4 border border-zinc-200 mb-5 gap-1">
          <Input
            label="Marque"
            type="text"
            placeholder="ex: Zara"
            name="brand"
            id="brand"
            required
            value={brand}
            onChange={onChangeBrand}
          />

          <Input
            label="Taille"
            type="text"
            placeholder="ex: L / 40 / 12"
            name="size"
            id="size"
            required
            value={size}
            onChange={onChangeSize}
          />

          <Input
            label="Couleur"
            type="text"
            placeholder="ex: Fuschia"
            name="color"
            id="color"
            required
            value={color}
            onChange={onChangeColor}
          />

          <Input
            label="État"
            type="text"
            placeholder="ex: Neuf avec étiquette"
            name="condition"
            id="condition"
            required
            value={condition}
            onChange={onChangeCondition}
          />

          <Input
            label="Lieu"
            type="text"
            placeholder="ex: Paris"
            name="localisation"
            id="localisation"
            required
            value={localisation}
            onChange={onChangeLocalisation}
          />

          <label htmlFor="paymentMode">Mode de paiement</label>
          <select
            id="paymentMode"
            name="paymentMode"
            className="mt-2 block border-b border-b-amber w-full p-2 focus:focus-ring focus:border-b-transparent col-span-2"
            onChange={onChangePaymentMode}
          >
            <option value="">-- Veuillez choisir une option --</option>
            <option value="creditCard">Carte bancaire</option>
            <option value="paypal">Paypal</option>
          </select>
        </div>

        <div className="grid grid-cols-3 p-4 border border-zinc-200 mb-5">
          <Input
            label="Prix"
            type="text"
            placeholder="0.00 €"
            name="price"
            id="price"
            required
            value={price}
            onChange={onChangePrice}
          />

          <>
            <span></span>
            <Checkbox
              label="Je suis intéressé·e par les échanges"
              id="wantSwitch"
              name="wantSwitch"
              checked={wantSwitch}
              onChange={onChangeWantSwitch}
              className="col-span-2"
            />
          </>
        </div>

        <button type="submit" className="button filled w-full py-4 mb-10">
          Publier
        </button>
      </form>
    </div>
  );
};
