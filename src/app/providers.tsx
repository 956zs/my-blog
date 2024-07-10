'use client';

import { ReactNode } from 'react';
import { SSRProvider } from 'react-bootstrap';

export function Providers({ children }: { children: ReactNode }) {
  return <SSRProvider>{children}</SSRProvider>;
}