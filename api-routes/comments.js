import supabase from '@/lib/supabaseClient';
export const commentsCacheKey = '/api/comments';

export const getComments = async (post_id) => {
  //Handle get all comments
  const { data, error, status } = await supabase.from('comments_posts').select('*').eq("post_id", post_id);

  return { data, error, status };
};

export const addComment = async (_, {arg: comment}) => {
  //Handle add comment here
  const { error, status } = await supabase.from('comments_posts').insert({...comment})

  return { error, status };
};

export const removeComment = () => {
  //Handle remove comment here
};
