
import type { FC, ReactNode } from 'react';
import { Header } from '@/components/header';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <main className="flex-grow flex flex-col container mx-auto px-4 py-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
