import React from 'react';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="flex justify-between bottom-0 z-10 absolute bg-black w-full p-3">
      <div>Home</div>
      <div>Browse</div>
      <div>Profile</div>
    </div>
  );
};

export default Navigation;
