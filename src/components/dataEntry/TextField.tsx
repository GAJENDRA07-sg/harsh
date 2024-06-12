import { useState } from 'react';

interface TextFieldProps<T> {
  label: string;
  value: string;
  disabled?:boolean;
  propertyName: keyof T;
  onChange: (value: string, propertyName: keyof T) => void;
}

const LabelComponent = ({ label }: { label: string }) => (
  <label className='font-goodHeadlineMedium text-sm text-black text-opacity-50'>
    {label}
  </label>
);

const InputComponent = <T,>({
  label,
  onChange,
  propertyName,
  value,
  disabled,
}: TextFieldProps<T>) => {
  const [focused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, propertyName);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <input
      className={`relative w-full rounded-md bg-hpBlue bg-opacity-5 px-2 py-2 transition-colors hover:bg-hpBlue hover:bg-opacity-10 focus:outline-none ${
        focused ? 'cursor-text bg-opacity-10' : 'cursor-pointer'
      }`}
      placeholder={`Add ${label}...`}
      disabled={disabled??false}
      defaultValue={value}
      type={typeof value === 'number' ? 'number' : 'text'}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={label}
    />
  );
};

const TextField = <T,>({
  label,
  value,
  propertyName,
  onChange,
  disabled = false,
}: TextFieldProps<T>) => (
  <div className='relative flex w-full flex-col gap-1'>
    <LabelComponent label={label} />
    <InputComponent
      label={label}
      disabled={disabled}
      propertyName={propertyName}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextField;
