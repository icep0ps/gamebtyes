'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import api from '@/lib/api';

export default function SignUpPage() {
  const auth = async () => {
    const res = await api.post<{ url: string }>('/auth').then((res) => res.data);
    window.location.href = res.url;
    return;
  };

  return (
    <div className="flex flex-col mx-auto my-0 p-4 justify-center h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Sign up using your google account below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button className="w-full" onClick={auth}>
              Sign Up with Google
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="http://localhost:3001/auth/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
