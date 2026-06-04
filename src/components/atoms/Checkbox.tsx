import type { ChangeEvent } from "react";

type CheckboxProps = {
  label: string;
  id: string;
  name: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  label,
  id,
  name,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
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
