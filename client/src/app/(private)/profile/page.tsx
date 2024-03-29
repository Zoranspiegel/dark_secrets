'use client';
import { useState } from 'react';
import PostsContainer from '@/app/components/PostsContainer';
import NewPost from './new-post';

export default function Profile (): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const posts = [];
  for (let i = 0; i < page; i++) {
    posts.push(<PostsContainer key={i} page={i} url='/api/posts' lastPage={lastPage} setLastPage={setLastPage}/>);
  }

  return (
    <div className='w-full min-h-full flex flex-col justify-start'>
      <NewPost setLastPage={setLastPage} />
      <div className='flex flex-col flex-grow justify-between pb-4 overflow-scroll'>
        {posts}
        <button
          disabled={lastPage}
          onClick={() => { setPage(page + 1); }}
          className='button'
        >Load more...</button>
      </div>
    </div>
  );
}
