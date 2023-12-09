'use client';

import React from 'react';
import { Filter } from '@/libs/types/types';
import useGlobalStore from '@/libs/stores/global';

type Props = {
  name: Filter;
};

const Filter = (props: Props) => {
  const { name } = props;
  const { filters, removeFilter, selectFilter } = useGlobalStore();

  const handleClick = () =>
    isFilterSelected(name) ? removeFilter(name) : selectFilter(name);

  const isFilterSelected = (name: Filter) => filters.some((filter) => filter === name);

  return (
    <span className="bg-zinc-900 rounded-2xl p-2 text-xs" onClick={handleClick}>
      {name}
    </span>
  );
};

export default Filter;
