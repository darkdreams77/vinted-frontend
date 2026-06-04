import type { ImageType } from "./image";

export type UserSignupType = {
  username: string;
  email: string;
  password: string;
  newsletter: boolean;
  avatar?: File;
};

export type UserCreatedType = {
  account: {
    username: string;
    avatar?: ImageType;
  };
  token: string;
  _id: string;
};
