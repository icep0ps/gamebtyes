import React, { FC } from 'react';

type Props = {
  error: Error;
  resetErrorBoundary: any;
};

const Error: FC<Props> = (props) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div role="alert" className="h-full flex justify-center items-center flex-col">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default Error;
