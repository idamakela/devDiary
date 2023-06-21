import AddComment from './partials/add-comment';
import BlogImageBanner from '@components/blog-image-banner';
import Button from '@components/button';
import Comments from './partials/comments';
import Heading from '@components/heading';
import styles from './blog-post.module.css';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postCacheKey, getPost, removePost } from '@/api-routes/posts';
import { useRouter } from 'next/router';
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { isAuthorLogedIn } from '@utils/isAuthorLogedIn';

export default function BlogPost() {
  // const supabaseClient = useSupabaseClient();
  // const user = useUser();

  const router = useRouter();
  const { slug } = router.query;

  console.log(user);
  //console.log(user.id);

  //fetch a SPECIFIC post
  const {
    data: { data = [] } = {},
    error,
    status,
  } = useSWR(slug ? `${postCacheKey}${slug}` : null, () => getPost({ slug }));

  console.log(data.user_id);

  //DELETE post
  const { trigger: deleteTrigger } = useSWRMutation(postCacheKey, removePost);

  const handleDeletePost = async (id) => {
    const { error, status } = await deleteTrigger(id);
    //TODO: send user to blog page when post is deleted
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  // const isAuthUser = () => {
  //   if (!user) {
  //     return false;
  //   }

  //   if (user.id === data.user_id) {
  //     return true;
  //   }

  //   return false;
  // };

  // console.log(isAuthUser());

  return (
    <>
      <section className={styles.container}>
        <Heading>{data.title}</Heading>
        {data?.image && <BlogImageBanner src={data.image} alt={data.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{data.createdAt}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
        <span className={styles.author}>Author: {data.author}</span>

        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        {isAuthorLogedIn({ postAuthor: data.user_id }) && (
          <div className={styles.buttonContainer}>
            <Button onClick={() => handleDeletePost(data.id)}>Delete</Button>
            <Button onClick={handleEditPost}>Edit</Button>
          </div>
        )}
      </section>

      <Comments postId={data.id} />

      {/* This component should only be displayed if a user is authenticated */}
      <AddComment postId={data.id} />
    </>
  );
}
