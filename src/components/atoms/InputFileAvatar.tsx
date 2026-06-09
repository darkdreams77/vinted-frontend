import { useEffect, useState, type ChangeEvent } from "react";
import { cn } from "../../helpers/cn";
import { RiUserAddLine } from "react-icons/ri";

type InputFileProps = {
  id: string;
  name: string;
  avatar: File | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  acceptMultiple?: boolean;
};

export const InputFileAvatar = ({
  id,
  name,
  avatar,
  onChange,
  acceptMultiple = false,
}: InputFileProps) => {
  const [previewAvatar, setPreviewAvatar] = useState("");

  useEffect(() => {
    if (avatar) {
      setPreviewAvatar(URL.createObjectURL(avatar));
    }
  }, [avatar]);

  return (
    <div className="w-full">
      {previewAvatar && (
        <img
          src={previewAvatar}
          alt="avatar ajouté"
          className="mb-2 p-1 border border-zinc-300 max-h-50 rounded-sm"
        />
      )}
      <label
        htmlFor={name}
        className={cn(
          "border border-amber text-zinc-700 w-full mb-6 block py-2 px-3 cursor-pointer",
          "flex gap-2 items-center",
        )}
      >
        {previewAvatar ? (
          <span className="text-lime-600">Avatar ajouté ✅</span>
        ) : (
          <>
            <RiUserAddLine /> Ajoute un avatar
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
