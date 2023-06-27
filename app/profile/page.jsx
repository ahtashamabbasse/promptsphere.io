'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
   const [posts, setPosts] = useState([]);
   const { data: session } = useSession();
   const router = useRouter();

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch(`/api/users/${session?.user?.id}/posts`);
         const data = await response.json();
         setPosts(data);
      };
      if (session?.user?.id) {
         fetchPosts();
      }
   }, [session?.user?.id]);

   const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
   };

   const handleDelete = () => {};

   return (
      <Profile
         name={session?.user?.name}
         desc={'Welcome to your personalized profile page'}
         data={posts}
         handleEdit={handleEdit}
         handleDelete={() => {}}
      />
   );
};

export default MyProfile;
