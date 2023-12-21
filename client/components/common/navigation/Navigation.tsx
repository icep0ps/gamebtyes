import React from 'react';
import Link from 'next/link';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="flex justify-between bottom-0 z-10  bg-black w-full p-3">
      <Link href={'/'}>Home</Link>
      <Link href={'/explore'}>Browse</Link>
      <Link href={'/profile'}>Profile</Link>
    </div>
  );
};

export default Navigation;
