'use client';

import {SessionProvider} from 'next-auth/react'

const Provider = ({children, session}) => {
    console.log(session)
    return <SessionProvider session={session}>
        {children}
    </SessionProvider>;
};

export default Provider;