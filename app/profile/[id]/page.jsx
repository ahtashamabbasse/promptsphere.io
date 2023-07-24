'use client';

import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';

const MyProfile = ({ params, searchParams }) => {
   const [posts, setPosts] = useState([]);
   const { userName = '' } = searchParams;

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch(`/api/users/${params?.id}/posts`);
         const data = await response.json();
         setPosts(data);
      };
      if (params?.id) {
         fetchPosts();
      }
   }, [params?.id]);

   return (
      <Profile
         name={userName}
         desc={'Welcome to your personalized profile page'}
         data={posts}
      />
   );
};

export default MyProfile;
