import { useEffect, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { LuArrowDownNarrowWide, LuArrowDownWideNarrow } from "react-icons/lu";

import { cn } from "../../helpers/cn";

type ToggleProps = {
  label: string;
};

export const Toggle = ({ label }: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("sort") === "price-desc") {
      setIsChecked(true);
    }
  }, [searchParams]);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);

    const nextSearchParams = new URLSearchParams(searchParams);

    if (e.target.checked) {
      nextSearchParams.set("sort", "price-desc");
    } else {
      nextSearchParams.set("sort", "price-asc");
    }

    setSearchParams(nextSearchParams);
  };

  return (
    <label
      className={cn(
        "flex justify-start items-center",
        "py-2",
        "text-l",
        "relative",
      )}
    >
      {label}
      <input
        type="checkbox"
        className="appearance-none peer absolute left-0 top-0 w-full h-full rounded-md"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span
        className={cn(
          "w-8 h-5 flex items-center shrink-0 ml-4 p-0.5 bg-gray-300 rounded-full cursor-pointer",
          "after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md",
          "peer-checked:bg-lagoon-400 peer-checked:after:translate-x-3",
          "duration-300 ease-in-out",
          "after:duration-300",
        )}
      ></span>
      <div className="flex gap-2 items-center ml-2 text-sm">
        {isChecked ? (
          <>
            <LuArrowDownWideNarrow /> Prix décroissant
          </>
        ) : (
          <>
            <LuArrowDownNarrowWide /> Prix croissant
          </>
        )}
      </div>
    </label>
  );
};
