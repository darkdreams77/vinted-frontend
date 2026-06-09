import type { ChangeEvent } from "react";
import { cn } from "../../helpers/cn";

type CheckboxProps = {
  label: string;
  id: string;
  name: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Checkbox = ({
  label,
  id,
  name,
  checked,
  onChange,
  className,
}: CheckboxProps) => {
  return (
    <div className={cn("flex items-center gap-2", className ? className : "")}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="size-4"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
