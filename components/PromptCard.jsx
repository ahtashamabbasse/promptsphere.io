import React, { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
   const { data: session } = useSession();
   const pathName = usePathname();
   const router = useRouter();

   const [copied, setCopied] = useState('');
   const handleCopy = () => {
      setCopied(post.prompt);
      navigator.clipboard.writeText(post.prompt);
      setTimeout(() => setCopied(''), 3000);
   };

   return (
      <div className={'prompt_card'}>
         <div className={'flex items-start justify-between gap-5'}>
            <div
               className={
                  'flex flex-1 cursor-pointer items-center justify-start gap-3'
               }
            >
               <Image
                  width={40}
                  height={40}
                  alt={'user image'}
                  src={post?.creator?.image}
                  className={'rounded-full object-contain'}
               />
               <div className={'flex flex-col'}>
                  <h3 className={'font-satoshi font-semibold text-gray-900'}>
                     {post.creator.username}
                  </h3>
                  <p className={'font-inter text-sm text-gray-500'}>
                     {post.creator.email}
                  </p>
               </div>
            </div>
            <div className={'copy_btn'} onClick={handleCopy}>
               <Image
                  width={12}
                  height={12}
                  alt={'copy icon'}
                  src={copied ? '/icons/tick.svg' : '/icons/copy.svg'}
               />
            </div>
         </div>
         <p className={'tex-sm my-4 font-satoshi text-gray-700 '}>
            {post.prompt}
         </p>
         <p
            className={'blue_gradient cursor-pointer font-inter text-sm'}
            onClick={() => handleTagClick && handleTagClick(post.tag)}
         >
            {post.tag}
         </p>

         {session?.user?.id === post.creator._id && pathName === '/profile' ? (
            <div
               className={
                  'flex-center mt-5 gap-4 border-t border-gray-100 pt-3'
               }
            >
               <p
                  className={'tex-sm green_gradient cursor-pointer font-inter'}
                  onClick={handleEdit}
               >
                  Edit
               </p>
               <p
                  className={'tex-sm orange_gradient cursor-pointer font-inter'}
                  onClick={handleDelete}
               >
                  Delete
               </p>
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

export default PromptCard;
