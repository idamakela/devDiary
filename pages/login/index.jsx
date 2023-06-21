import Heading from '@components/heading';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <Heading>Login</Heading>
      <Auth
        redirectTo='http://localhost:3000/'
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={[]}
      />
    </>
  );
};

export default LoginPage;
