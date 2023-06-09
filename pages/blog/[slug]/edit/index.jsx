import { useRouter } from 'next/router';
import BlogEditor from '@/components/blog-editor';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postCacheKey, getPost, editPost } from '@/api-routes/posts';

const mockData = {
  title: 'Community-Messaging Fit',
  body: '<p>This is a good community fit!</p>',
  image:
    'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg',
};

//Handle fetch the post into the editor and edit it

export default function EditBlogPost() {
  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  //fetch a SPECIFIC post
  const {
    data: { data = [] } = {},
    error,
    status,
  } = useSWR(slug ? `${postCacheKey}${slug}` : null, () => getPost({ slug }));

  //PUT post
  const { trigger: editTrigger } = useSWRMutation(postCacheKey, editPost);

  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    console.log({ editorContent, titleInput, image, slug });
  };

  return (
    <BlogEditor
      heading='Edit blog post'
      title={data.title}
      src={mockData.image}
      alt={data.title}
      content={data.body}
      buttonText='Save changes'
      onSubmit={handleOnSubmit}
    />
  );
}
