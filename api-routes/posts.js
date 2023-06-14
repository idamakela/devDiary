import supabase from '@/lib/supabaseClient';
import uploadImage from '@/utils/uploadImage.js';

export const postCacheKey = '/api/posts';

/* TODO:
 * error handling
 * semantic naming (newPost and so on...)
 */

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

export const addPost = async (_, { arg: newPost }) => {
  //Handle upload image here
  let image = '';

  if (newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  console.log({ image }, image);

  //Handle add post here
  const { error, status } = await supabase
    .from('posts')
    .insert({ ...newPost, image })
    .select()
    .single();

  return { error, status };
};

export const removePost = async (_, { arg: id }) => {
  //Handle remove post here
  const { error, status } = await supabase.from('posts').delete().eq('id', id);

  return { error, status };
};

export const editPost = async (_, { arg: post }) => {
  //upload image
  let image = post.image ?? '';

  //Handle edit post here
  const { error, status } = await supabase
    .from('posts')
    .update({ ...post })
    .eq('id', post.id);

  //ska .eq vara med och vad isf??
  return { error, status };
};
