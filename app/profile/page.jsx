'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileComponent from '@components/Profile';

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <ProfileComponent
      name={'My'}
      desc={'Welcome to your personalized profile page'}
      data={[]}
      handleEdit={handleEdit}
      handleDelete={() => {}}
    />
  );
};

export default Profile;
