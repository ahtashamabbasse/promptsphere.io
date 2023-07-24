'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';

const Nav = () => {
   const { data: session } = useSession();
   const [providers, setProviders] = useState();
   const [toggleDropdown, setToggleDropdown] = useState(false);

   useEffect(() => {
      (async () => {
         const response = await getProviders();
         setProviders(response);
      })();
   }, []);

   return (
      <nav className={'flex-between mb-16 w-full pt-3'}>
         <Link href={'/'} className={'flex-center flex gap-2'}>
            <Image
               width={30}
               height={30}
               src={'/images/logo.svg'}
               alt={'logo'}
               className={'object-contain'}
            />
            <p className={'logo_text'}>Prompt Sphere</p>
         </Link>

         {/*    Desktop Navigation     */}
         <div className={'hidden sm:flex'}>
            {session?.user ? (
               <div className={'flex gap-3 md:gap-5'}>
                  <Link href={'/create-prompt'} className={'black_btn'}>
                     {' '}
                     Create Post
                  </Link>
                  <button
                     type={'button'}
                     onClick={signOut}
                     className={'outline_btn'}
                  >
                     Sign Out
                  </button>
                  <Link href={'/profile'}>
                     <Image
                        height={37}
                        width={37}
                        alt={'Profile'}
                        src={session.user.image}
                        className={'rounded-full'}
                     />
                  </Link>
               </div>
            ) : (
               <>
                  {providers &&
                     Object.values(providers).map((provider) => {
                        return (
                           <button
                              type={'button'}
                              key={provider.name}
                              onClick={() => signIn(provider.id)}
                           >
                              Sign In
                           </button>
                        );
                     })}
               </>
            )}
         </div>

         {/*    Mobile Navigation     */}
         <div className={'relative flex sm:hidden'}>
            {session?.user ? (
               <div className={'flex'}>
                  <Image
                     height={37}
                     width={37}
                     alt={'Profile'}
                     src={session.user.image}
                     className={'rounded-full'}
                     onClick={() =>
                        setToggleDropdown((prevState) => !prevState)
                     }
                  />
                  {toggleDropdown && (
                     <div className={'dropdown'}>
                        <Link href={'/profile'} className={'dropdown_link'}>
                           My Profile
                        </Link>
                        <Link
                           href={'/create-prompt'}
                           className={'dropdown_link'}
                           onClick={() => setToggleDropdown(false)}
                        >
                           Create Post
                        </Link>
                        <button
                           type={'button'}
                           className={'black_btn mt-5 w-full'}
                           onClick={() => {
                              setToggleDropdown(false);
                              signOut();
                           }}
                        >
                           Sign Out
                        </button>
                     </div>
                  )}
               </div>
            ) : (
               <>
                  {providers &&
                     Object.values(providers).map((provider) => {
                        return (
                           <button
                              type={'button'}
                              key={provider.name}
                              onClick={() => signIn(provider.id)}
                           >
                              Sign In
                           </button>
                        );
                     })}
               </>
            )}
         </div>
      </nav>
   );
};

export default Nav;
