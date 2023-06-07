import supabase from '@/lib/supabaseClient';
export const postCacheKey = '/api/posts';

export const getPosts = async () => {
  //Handle get all posts
  const { data, error, status } = await supabase.from('posts').select('*');

  return { data, error, status };
};

export const getPost = async ({ slug }) => {
  //handle get a specific post
  const { data, error, status } = await supabase
    .from('posts')
    .select('*')
    .single()
    .eq('slug', slug);

  return { data, error, status };
};

export const addPost = async (_, { arg: slug }) => {
  //Handle add post here
  // slug is unique, handle error if its not!
  const { error, status } = await supabase.from('posts').insert({ slug });

  return { error, status };
};

export const removePost = async (id) => {
  //Handle remove post here
  const { error, status } = await supabase.from('Posts').delete().eq('id', id);

  return { error, status };
};

export const editPost = () => {
  //Handle edit post here
};
