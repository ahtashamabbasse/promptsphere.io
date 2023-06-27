'use client';

import React, { useEffect, useState } from 'react';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPrompt = () => {
   const [submitting, setSubmitting] = useState(false);
   const [post, setPost] = useState({
      prompt: '',
      tag: '',
   });
   const { data: session } = useSession();
   const router = useRouter();
   const searchParams = useSearchParams();
   const promptId = searchParams.get('id');

   useEffect(() => {
      console.log(promptId);

      const fetchPost = async () => {
         const response = await fetch(`/api/prompt/${promptId}`);
         const data = await response.json();
         console.log(data);
         setPost(data);
      };
      if (promptId) {
         fetchPost();
      }
   }, [promptId]);

   const updatePrompt = async (e) => {
      e.preventDefault();
      if (!promptId) {
         alert('Missing Prompt ID');
      }
      try {
         setSubmitting(true);
         const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            body: JSON.stringify({
               prompt: post.prompt,
               tag: post.tag,
            }),
         });
         if (response.ok) {
            router.push('/profile');
         }
      } catch (err) {
         console.log('err :: ', err);
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <div>
         <Form
            post={post}
            type={'Edit'}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
            setSubmitting={setSubmitting}
         />
      </div>
   );
};

export default EditPrompt;
