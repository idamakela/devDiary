import BlogEditor from '@/components/blog-editor';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { createSlug } from '@/utils/createSlug';
import { postCacheKey, getPost, editPost } from '@/api-routes/posts';
import { useRouter } from 'next/router';

export default function EditBlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  //GET specific post
  const {
    data: { data = [] } = {},
    error,
    status,
  } = useSWR(slug ? `${postCacheKey}${slug}` : null, () => getPost({ slug }));

  //PUT post
  const { trigger: editTrigger } = useSWRMutation(postCacheKey, editPost);

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const newSlug = createSlug(titleInput);

    const updatedPost = {
      body: editorContent,
      title: titleInput,
      image,
      slug: newSlug,
      id: data.id,
    };

    console.log({ slug, newSlug });
    const { error, status } = await editTrigger(updatedPost);

    if (error || status !== 200) {
      console.log({ status, error });
      return;
    }

    if (newSlug && newSlug !== slug) {
      router.push(`/blog/${newSlug}`);
    } else {
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <BlogEditor
      heading='Edit blog post'
      title={data.title}
      src={data.image}
      alt={data.title}
      content={data.body}
      buttonText='Save changes'
      onSubmit={handleOnSubmit}
    />
  );
}
