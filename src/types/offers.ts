import type { ImageType } from "./image";

export type OffersDataType = {
  count: number;
  offers: OfferType[];
};

export type OfferType = {
  _id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  product_details: ProductDetailsType[];
  product_pictures: ImageType[];
  product_image: ImageType;
  owner: OwnerType;
};

export type ProductDetailsType = Record<ProductDetails, string>;

enum ProductDetails {
  brand = "MARQUE",
  size = "TAILLE",
  state = "ÉTAT",
  color = "COULEUR",
  localization = "EMPLACEMENT",
  payment = "MODES DE PAIEMENT",
}

export type OwnerType = {
  account: AccountType;
  _id: string;
};

export type AccountType = {
  username: string;
  avatar: ImageType;
};
