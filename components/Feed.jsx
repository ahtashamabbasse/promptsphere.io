'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
   return (
      <div className={'prompt_layout mt-16'}>
         {data.map((post) => {
            return (
               <PromptCard
                  post={post}
                  key={post._id}
                  handleTagClick={handleTagClick}
               />
            );
         })}
      </div>
   );
};

const Feed = () => {
   const [posts, setPosts] = useState([]);

   // Search states
   const [searchText, setSearchText] = useState('');
   const [searchTimeout, setSearchTimeout] = useState(0);
   const [searchedResults, setSearchedResults] = useState([]);

   useEffect(() => {
      (async () => {
         const response = await fetch('/api/prompt');
         const data = await response.json();
         setPosts(data);
      })();
   }, []);

   const filterPrompt = (searchText) => {
      const regex = new RegExp(searchText, 'i');
      return posts.filter(
         (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
      );
   };
   const onSearchChangeHandler = (event) => {
      clearTimeout(searchTimeout);
      setSearchText(event.target.value);

      setSearchTimeout(
         setTimeout(() => {
            const searchResults = filterPrompt(event.target.value);
            setSearchedResults(searchResults);
            console.log(searchResults);
         }, 500)
      );
   };
   const handleTagClick = (tagName) => {
      setSearchText(tagName);

      const searchResult = filterPrompt(tagName);
      setSearchedResults(searchResult);
   };

   return (
      <section className={'feed'}>
         <form className={'flex-center relative w-full'}>
            <input
               type={'text'}
               value={searchText}
               className={'search_input peer'}
               placeholder={'Search for a tag or a username'}
               onChange={onSearchChangeHandler}
            />
         </form>

         {searchText ? (
            <PromptCardList
               data={searchedResults}
               handleTagClick={handleTagClick}
            />
         ) : (
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
         )}
      </section>
   );
};

export default Feed;
