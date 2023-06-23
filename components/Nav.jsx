'use client';
import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Nav = () => {
    const isUserLoggedIn = true
    const [providers, setProviders] = useState();
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {

        (async () => {

            const response = await getProviders();
            console.log(response)
            setProviders(response)

        })()


    }, [])


    return (
        <nav className={'flex-between w-full mb-16 pt-3'}>
            <Link href={'/'} className={'flex flex-center gap-2'}>
                <Image width={30} height={30} src={'/images/logo.svg'} alt={'logo'} className={'object-contain'}/>
                <p className={'logo_text'}>Promptopia</p>
            </Link>

            {/*    Desktop Navigation     */}
            <div className={'sm:flex hidden'}>
                {
                    isUserLoggedIn ? (
                        <div className={'flex gap-3 md:gap-5'}>
                            <Link href={'/create-prompt'} className={'black_btn'}> Create Post</Link>
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
                                    src={'/images/logo.svg'}
                                    className={'rounded-full'}
                                />
                            </Link>
                        </div>
                    ) : (<>
                        {providers && Object.values(providers).map(provider => {

                            return <button
                                type={'button'}
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                            >
                                Sign In
                            </button>
                        })}
                    </>)
                }
            </div>

            {/*    Mobile Navigation     */}
            <div className={'sm:hidden flex relative'}>
                {isUserLoggedIn ? (
                    <div className={'flex'}>
                        <Image
                            height={37}
                            width={37}
                            alt={'Profile'}
                            src={'/images/logo.svg'}
                            className={'rounded-full'}
                            onClick={() => setToggleDropdown(prevState => !prevState)}
                        />
                        {toggleDropdown &&
                            <div className={'dropdown'}>
                                <Link
                                    href={'/profile'}
                                    className={'dropdown_link'}
                                >
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
                                    className={'mt-5 w-full black_btn'}
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut();
                                    }}
                                >
                                    Sign In
                                </button>
                            </div>}
                    </div>
                ) : (
                    <>{providers && Object.values(providers).map(provider => {
                        return <button
                            type={'button'}
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                        >
                            Sign In
                        </button>
                    })}
                    </>
                )
                }
            </div>

        </nav>
    );
};

export default Nav;