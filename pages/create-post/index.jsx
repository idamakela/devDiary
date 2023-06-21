import BlogEditor from '@/components/blog-editor';
import useSWRMutation from 'swr/mutation';
import { addPost, postCacheKey } from '@/api-routes/posts';
import { createSlug } from '@/utils/createSlug';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

//TODO: Redirect to blog page when post is created
import { useRouter } from 'next/router';

export default function CreatePost() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    postCacheKey,
    addPost
  );

  const handleAddPost = async (post) => {
    const { error, status } = await addTrigger(post);
  };

  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    const author = user.email.split('@')[0];

    const newPost = {
      body: editorContent,
      title: titleInput,
      image,
      slug,
      user_id: user.id,
      author,
    };

    //TODO: image to databse
    console.log({
      body: editorContent,
      title: titleInput,
      image,
      slug,
      user_id: user.id,
      author,
    });

    //SWR post to database, without image
    handleAddPost(newPost);
  };

  /* FOR IMAGE UPLOAD:
   * Input field for pic, and input field for pic alt
   *
   */
  return (
    <BlogEditor
      heading='Create post'
      onSubmit={handleOnSubmit}
      buttonText='Upload post'
    />
  );
}
