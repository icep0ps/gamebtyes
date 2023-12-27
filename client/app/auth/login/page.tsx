import { NextPage } from 'next';
import { HTMLInputTypeAttribute } from 'react';

type Props = {};

const Login: NextPage<Props> = (props) => {
  const renderFormField = (
    label: string,
    name: string,
    type: HTMLInputTypeAttribute,
    required?: boolean
  ) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} required={required} />
    </div>
  );

  return (
    <form method="POST">
      {renderFormField('email', 'email', 'email', true)}
      {renderFormField('password', 'password', 'password', true)}
    </form>
  );
};

export default Login;
