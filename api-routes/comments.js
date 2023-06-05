import supabase from '../lib/supabaseClient';
export const commentsCacheKey = '/api/comments';

export const getComments = ({post_id}) => {
  //Handle get all comments
  const { data, error, status } = await supabase.from('comments_posts').select('*').eq("post_id", post_id);

  return { data, error, status };
};

export const addComment = () => {
  //Handle add comment here
};

export const removeComment = () => {
  //Handle remove comment here
};
