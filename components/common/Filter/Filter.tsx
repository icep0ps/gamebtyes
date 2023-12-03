import React from 'react';

type Props = {
  name: string;
};

const Filter = (props: Props) => {
  const { name } = props;
  return <span>{name}</span>;
};

export default Filter;
