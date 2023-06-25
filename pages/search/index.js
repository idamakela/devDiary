import Button from '@components/button';
import Heading from '@components/heading';
import Input from '@components/input';
import Label from '@components/label';
import Link from 'next/link';
import resultStyling from '../blog/blog.module.css';
import styles from './search.module.css';
import useSWR from 'swr';
import { manipulateDate } from '@/utils/manipulateDate';
import { searchPosts, postCacheKey } from '@/api-routes/posts';
import { useRef, useState } from 'react';

export default function Search() {
  const formRef = useRef();
  const [fetchData, setFetchData] = useState(false);
  const [title, setTitle] = useState('');

  const { data: { data = [] } = {} } = useSWR(
    fetchData ? `${postCacheKey}${title}` : null,
    () => searchPosts(title),
    [title]
  );
  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData);

    setTitle(formDataObject.searchQuery);
    setFetchData(!fetchData);
  };

  return (
    <>
      <Heading>Search posts</Heading>

      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor='searchQuery'>Search post title</Label>
          <Input id='searchQuery' name='searchQuery' />
        </div>

        <Button>Submit</Button>
      </form>

      <section className={styles.resultsContainer}>
        <h2>Result</h2>
        {data?.map((post) => (
          <Link
            key={post.slug}
            className={resultStyling.link}
            href={`/blog/${post.slug}`}
          >
            <div className='w-full flex flex-col'>
              <p>{post.title}</p>
              <time className={resultStyling.date}>
                {manipulateDate(post.created_at)}
              </time>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
