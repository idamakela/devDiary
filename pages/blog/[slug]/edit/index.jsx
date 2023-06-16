import { useRouter } from 'next/router';
import BlogEditor from '@/components/blog-editor';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { postCacheKey, getPost, editPost } from '@/api-routes/posts';
import { createSlug } from '@/utils/createSlug';

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

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const newSlug = createSlug(titleInput);

    //TODO: semantic changes
    const updatedPost = {
      body: editorContent,
      title: titleInput,
      image,
      slug: newSlug,
      id: data.id,
    };

    console.log({
      body: editorContent,
      title: titleInput,
      image,
      slug: newSlug,
      id: data.id,
    });

    const { error, status } = await editTrigger({
      body: editorContent,
      title: titleInput,
      slug: newSlug,
      id: data.id,
    });
    console.log(error);
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

//NEXT getServerSideProps
//gör att kod körs på servern (iom pages är klientrenderat)
//nedan kod kollar om ägaren till posten är inloggad osv...
/*
export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);

  const { slug } = ctx.params;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { ðata } = await supabase
    .from('posts')
    .select()
    .single()
    .eq('slug', slug);

  console.log({ data });
  console.log({ session });

  const isAuthor = data.user_id === session.user.id;
  console.log({ isAuthor });

  //redirects user to destination 
  if (!isAuthor) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
*/
