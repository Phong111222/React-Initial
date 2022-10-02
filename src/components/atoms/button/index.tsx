import React, { FC } from 'react';
export interface ButtonProps {
  title: string;
}

const Button: FC<ButtonProps> = ({ title, ...rest }) => {
  return <button {...rest}>{title}</button>;
};

export default Button;
