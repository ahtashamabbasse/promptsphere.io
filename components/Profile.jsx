import React from 'react';
import PromptCard from '@components/PromptCard';

const Profile = ({ name, desc, handleDelete, handleEdit, data }) => {
   return (
      <section className={'w-full'}>
         <h1 className={'head_text text-left'}>
            <span className={'blue_gradient'}>{name} Profile</span>
         </h1>
         <p className={'desc text-left'}>{desc}</p>

         <div className={'prompt_layout mt-10'}>
            {data.map((post) => {
               return (
                  <PromptCard
                     post={post}
                     key={post._id}
                     handleEdit={handleEdit && handleEdit(post)}
                     handleDelete={handleDelete && handleDelete(post)}
                  />
               );
            })}
         </div>
      </section>
   );
};

export default Profile;
