interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}

const FormInput = ({ value, onChange, placeholder, type }: FormInputProps) => {
  return (
    <input
      className="w-full py-[0.9375rem] ps-3 border-2 border-typography-light dark:border-typography-dark rounded-md outline-none"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required
    />
  );
};
export default FormInput;
