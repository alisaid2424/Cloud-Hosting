import { Path, FieldValues, UseFormRegister } from "react-hook-form";

type TFormProps<TFieldValue extends FieldValues> = {
  name: Path<TFieldValue>;
  register: UseFormRegister<TFieldValue>;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  isTextArea?: boolean;
};

const Input = <TFieldValue extends FieldValues>({
  isTextArea,
  placeholder,
  name,
  error,
  register,
  type = "text",
  disabled,
}: TFormProps<TFieldValue>) => {
  return (
    <div>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          id={name}
          {...register(name)}
          disabled={disabled}
          rows={5}
          className={`block w-full text-sm sm:text-base input ${error ? "border-red-500" : ""} resize-none p-2`}
        />
      ) : (
        <input
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          id={name}
          {...register(name)}
          disabled={disabled}
          className={`block w-full text-sm sm:text-base input ${error ? "border-red-500" : ""}`}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
