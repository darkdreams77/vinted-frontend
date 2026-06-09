type TextareaProps = {
  placeholder: string;
  name: string;
  id: string;
  required?: boolean;
  value: HTMLInputElement["value"];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  label?: string;
};

export const Textarea = ({
  label,
  placeholder,
  name,
  id,
  value,
  onChange,
  required = false,
  rows = 5,
}: TextareaProps) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        placeholder={placeholder}
        name={name}
        id={id}
        required={required}
        rows={rows}
        autoComplete="on"
        value={value}
        onChange={onChange}
        className="border-b border-b-amber w-full p-2 focus:focus-ring focus:border-b-transparent col-span-2"
      />
    </>
  );
};
