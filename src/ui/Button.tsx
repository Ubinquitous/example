import { ComponentPropsWithoutRef } from 'react';

export const Button = (props: ComponentPropsWithoutRef<'button'>) => (
  <button
    type="button"
    className="text-white bg-black rounded-lg py-2 px-5 font-semibold cursor-pointer"
    {...props}
  />
);
