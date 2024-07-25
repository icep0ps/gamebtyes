'use client';

import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

type IBreadcrumbProps = unknown;

export default function Breadcrumb(props: IBreadcrumbProps) {
  const { back } = useRouter();
  const pathname = usePathname().split('/')[1];

  if (pathname === '')
    return (
      <div className="flex font-bold items-center gap-2 self-start bg-background p-4 w-full">
        <h1 className="text-lg capitalize">Gamebytes</h1>
      </div>
    );

  return (
    <div className="flex font-bold items-center gap-2 self-start bg-background p-4 w-full">
      <ArrowLeft onClick={back} />
      <h1 className="text-lg capitalize">{pathname}</h1>
    </div>
  );
}
