import supabase from '@/lib/supabaseClient';
export const postCacheKey = '/api/posts';

//TODO: error handling

export const getPosts = async () => {
  //Handle get all posts
  const { data, error, status } = await supabase.from('posts').select('*');

  return { data, error, status };
};

export const getPost = async ({ slug }) => {
  //Handle get a specific post
  const { data, error, status } = await supabase
    .from('posts')
    .select('*')
    .single()
    .eq('slug', slug);

  return { data, error, status };
};

export const addPost = async (_, { arg: post }) => {
  //Handle add post here
  const { error, status } = await supabase.from('posts').insert({ ...post });

  return { error, status };
};

export const removePost = async (_, { arg: id }) => {
  //Handle remove post here
  const { error, status } = await supabase.from('posts').delete().eq('id', id);

  return { error, status };
};

export const editPost = async (_, { arg: post }) => {
  //Handle edit post here
  const { error, status } = await supabase
    .from('post')
    .update({ ...post })
    .eq('id', id);

  return { error, status };
};
