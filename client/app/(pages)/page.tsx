'use client';
import { ErrorBoundary } from 'react-error-boundary';

import Posts from '@/components/ui/posts';
import Error from '@/components/common/Error';
import Filter from '@/components/common/Filter/Filter';

export default function Home() {
  return (
    <>
      <h1 className="text-2xl">Latest news</h1>
      <div className="flex gap-2 items-center">
        <Filter name="PC Gaming" />
        <Filter name="Mobile Gaming" />
        <Filter name="Console Gaming" />
      </div>
      <ErrorBoundary FallbackComponent={Error}>
        <Posts />
      </ErrorBoundary>
    </>
  );
}
