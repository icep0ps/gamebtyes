'use client';

import useGlobalStore from '@/libs/stores/global';
import React from 'react';

type Props = {};

const Remove = (props: Props) => {
  const { clearFilters } = useGlobalStore();

  return (
    <button
      className="bg-zinc-900 h-8 w-8 rounded-full flex flex-col justify-center items-center"
      onClick={clearFilters}
    >
      X
    </button>
  );
};

export default Remove;
