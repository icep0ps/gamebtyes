import React from 'react';

type Props = {
  body: string;
  title: string;
};

const Slide = (props: Props) => {
  const { body, title } = props;
  return (
    <div>
      <h1 className="text-2xl">{title}</h1>
      <p>{body.replace(/None/g, '')}</p>
    </div>
  );
};

export default Slide;
