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
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    })();
  }, []);

  const onSearchChangeHandler = () => {};

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
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
