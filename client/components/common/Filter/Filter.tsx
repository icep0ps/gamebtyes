'use client';

import React from 'react';

type Props = {
  name: Filter;
};

const Filter = (props: Props) => {
  const { name } = props;
  return (
    <span className="bg-zinc-900 rounded-lg p-2 text-xs whitespace-nowrap">{name}</span>
  );
};

export default Filter;
