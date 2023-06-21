// import supabase from '../lib/supabaseClient';
// export const usersCacheKey = '/api/users';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export const getUser = () => {
  //Handle get authenticated user information
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return user;
};

/*
 * TODO: what is supposed to be in here ??
 * 
 */
