import { ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
}

export const Input = ({ label, ...props }: InputProps) => (
  <figure className="flex flex-col gap-1">
    <figcaption className="text-sm text-gray-700">{label}</figcaption>
    <input
      className="shadow-sm rounded-lg border border-solid border-gray-950 outline-none py-1 px-2 min-w-64"
      {...props}
    />
  </figure>
);
