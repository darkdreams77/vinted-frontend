type InputProps = {
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  id: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  required = false,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      required={required}
      autoComplete="on"
      value={value}
      onChange={onChange}
      className="border-b border-b-amber w-full p-2 focus:focus-ring mb-10 focus:border-b-transparent"
    />
  );
};
