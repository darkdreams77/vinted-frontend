import { useEffect, useState, type ChangeEvent } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { cn } from "../../helpers/cn";

type InputFileProps = {
  id: string;
  name: string;
  picture: File | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  acceptMultiple?: boolean;
};

export const InputFileOffer = ({
  id,
  name,
  picture,
  onChange,
  acceptMultiple = false,
}: InputFileProps) => {
  const [previewImg, setPreviewImg] = useState("");

  useEffect(() => {
    if (picture) {
      setPreviewImg(URL.createObjectURL(picture));
    }
  }, [picture]);

  return (
    <div className="w-full">
      {previewImg && (
        <img
          src={previewImg}
          alt="image ajouté"
          className="mb-2 p-1 border border-zinc-300 max-h-50 rounded-sm"
        />
      )}
      <label
        htmlFor={name}
        className={cn(
          "border border-amber text-zinc-700 w-full mb-6 block py-2 px-3 cursor-pointer text-center",
          "flex gap-2 items-center justify-center",
        )}
      >
        {previewImg ? (
          <span className="text-lime-600">Image ajoutée ✅</span>
        ) : (
          <>
            <MdOutlineAddPhotoAlternate size={40} />
          </>
        )}
      </label>
      <input
        className={cn("hidden")}
        id={id}
        name={name}
        type="file"
        multiple={acceptMultiple}
        onChange={onChange}
      />
    </div>
  );
};
