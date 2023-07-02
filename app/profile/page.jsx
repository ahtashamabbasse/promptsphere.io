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

   const handleDelete = async (post) => {
      const hasConfirm = confirm(
         'Are you sure you want to delete this prompt?'
      );
      if (!hasConfirm) return null;

      try {
         await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'delete',
         });
         const filteredPost = posts.filter((p) => p._id !== post._id);
         setPosts(filteredPost);
      } catch (err) {
         console.log('error ', err);
      }
   };

   return (
      <Profile
         name={session?.user?.name}
         desc={'Welcome to your personalized profile page'}
         data={posts}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   );
};

export default MyProfile;
