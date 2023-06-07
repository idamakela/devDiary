import BlogEditor from '@/components/blog-editor';
import { createSlug } from '@/utils/createSlug';
import useSWRMutation from 'swr/mutation';
import { addPost, postCacheKey } from '@api-routes/posts';

export default function CreatePost() {
  const { trigger: addTrigger, isMutating } = useSWRMutation(cacheKey, addPost);

  const handleAddPost = async (name) => {
    const { error, status } = await addTrigger(name);

    if (status !== 201) {
      setToaster({
        message: error.message,
        type: "error",
      });
    }
  };

  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    console.log({ editorContent, titleInput, image, slug });

    //swr push to database
  };

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    cacheKey,
    addCharacter,
    {
      onError: () => {
        setToaster({
          message: 'An error occuredwhen trying to add a character',
          type: 'error',
        });
      },
    }
  );

  return (
    <BlogEditor
      heading='Create post'
      onSubmit={handleOnSubmit}
      buttonText='Upload post'
    />
  );
}
