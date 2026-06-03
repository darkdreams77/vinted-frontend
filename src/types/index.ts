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

export type ImageType = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
};

export type OwnerType = {
  account: AccountType;
  _id: string;
};

export type AccountType = {
  username: string;
  avatar: ImageType;
};
