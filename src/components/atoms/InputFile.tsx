import type { ChangeEvent } from "react";
import { cn } from "../../helpers/cn";

type InputFileProps = {
  id: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  acceptMultiple?: boolean;
};

export const InputFile = ({
  id,
  name,
  onChange,
  acceptMultiple = false,
}: InputFileProps) => {
  return (
    <>
      <input
        className={cn(
          "border-b border-b-amber w-full mb-6",
          "file:bg-amber-100 file:px-2 file:py-1 file:text-amber-700 file:cursor-pointer file:mb-1 file:rounded-sm",
          "hover:file:bg-amber-200",
        )}
        id={id}
        name={name}
        type="file"
        multiple={acceptMultiple}
        onChange={onChange}
      />
    </>
  );
};
