//NOT IN USE
//saved only for possible future implementation 

import supabase from '@/lib/supabaseClient';
export const usersCacheKey = '/api/users';

//GET user info
export const getUser = async ({authUserId}) => {
  const { data, error, status } = await supabase
    .from('users')
    .select('*')
    .single()
    .eq('id', authUserId);

  return { data, error, status };
};

// PUT updates into user
export const editUser = async (_, { arg: name, userId }) => {
  if (!userId) {
    return null;
  }

  const { data, error, status } = await supabase
    .from('users')
    .update({ name })
    .eq('id', user.id)
    .select()
    .single();

  return { error, status };
};
