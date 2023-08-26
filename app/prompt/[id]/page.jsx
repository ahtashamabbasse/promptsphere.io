import React from 'react';
import Image from 'next/image';

async function getUserPrompts(id) {
   const response = await fetch(`/api/users/${id}/posts`, {
      next: { revalidate: 300 },
   });
   if (!response.ok) {
      throw new Error('Failed to fetch data');
   }
   return response.json();
}

export async function generateMetadata({ params }) {
   const id = params.id;
   const data = await getUserPrompts(id);

   return {
      title: data[0].prompt,
   };
}

const Page = async (props) => {
   const { id } = props.params;
   const data = await getUserPrompts(id);

   return (
      <div>
         <div className={'flex w-screen justify-between'}>
            {data.map((post) => {
               return (
                  <div className={'prompt_card m-4 '} key={post._id}>
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
                              <h3
                                 className={
                                    'font-satoshi font-semibold text-gray-900'
                                 }
                              >
                                 {post.creator.username}
                              </h3>
                              <p className={'font-inter text-sm text-gray-500'}>
                                 {post.creator.email}
                              </p>
                           </div>
                        </div>
                        <div className={'copy_btn'}>
                           <Image
                              width={12}
                              height={12}
                              alt={'copy icon'}
                              src={'/icons/tick.svg'}
                           />
                        </div>
                     </div>
                     <p className={'tex-sm my-4 font-satoshi text-gray-700 '}>
                        {post.prompt}
                     </p>
                     <p
                        className={
                           'blue_gradient cursor-pointer font-inter text-sm'
                        }
                     >
                        {post.tag}
                     </p>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

export default Page;
