import BlogEditor from '@/components/blog-editor';
import useSWRMutation from 'swr/mutation';
import { addPost, postCacheKey } from '@/api-routes/posts';
import { createSlug } from '@/utils/createSlug';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function CreatePost() {
  const user = useUser();
  const router = useRouter();

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    postCacheKey,
    addPost
  );

  const handleAddPost = async (post) => {
    const { error, status } = await addTrigger(post);
  };

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
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

    await handleAddPost(newPost);
    router.push(`/blog/${slug}`);
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
