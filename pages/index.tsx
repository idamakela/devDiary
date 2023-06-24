import Heading from '@components/heading';
import styles from './home.module.css';

export default function Home() {
  return (
    <>
      <Heading>Home</Heading>
      <p className={styles.text}>Welcome to devDiary!</p>
      <p className={styles.text}>
        Are you a curious developer with thoughts to share? Join our vibrant
        community on devDiary and embark on an exploration of the captivating
        world of web development. Dive into our short and insightful posts that
        offer a glimpse into the minds of fellow coders. With the power of
        Next.js, SWR, and Supabase, we provide a seamless browsing experience,
        real-time updates, and secure data storage. Get inspired, gain
        knowledge, and connect with like-minded individuals. Unleash your
        thoughts and start sharing your unique perspective on devDiary today!
      </p>
    </>
  );
}
