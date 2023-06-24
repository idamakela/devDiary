import { useUser } from '@supabase/auth-helpers-react';

export const isAuthorLogedIn = ({ postAuthor }) => {
  const user = useUser();

  if (!user) {
    return false;
  }

  if (user.id === postAuthor) {
    return true;
  }

  return false;
};
