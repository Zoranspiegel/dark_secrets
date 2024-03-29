'use client';
import { SWRConfig } from 'swr';
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';
import PrivateContextProvider from '../contexts/PrivateContext';
import { fetcher } from '../utils/fetcher';

export default function PrivateLayout ({
  children
}: { children: React.ReactNode }): JSX.Element {
  return (
    <SWRConfig value={{ fetcher }}>
      <PrivateContextProvider>
        <div className='h-screen flex flex-col justify-between items-center py-[1vh] px-[1vh]'>
          <Header />
          <NavBar />
          <main
            className='w-full max-w-md h-[74vh] flex flex-col justify-start items-start border-4 border-double border-[green] rounded-lg bg-black bg-opacity-70 px-4 pt-4'
          >{children}</main>
          <Footer />
        </div>
      </PrivateContextProvider>
    </SWRConfig>
  );
}
