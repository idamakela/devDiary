import Button from '@components/button';
import styles from './comment.module.css';
import useSWRMutation from 'swr/mutation';
import { commentsCacheKey, removeComment } from '@/api-routes/comments';
import { isAuthorLogedIn } from '@/utils/isAuthorLogedIn';

export default function Comment({
  comment,
  createdAt,
  author,
  id,
  postAuthorId,
}) {
  const { trigger: deleteTrigger, isMutating } = useSWRMutation(
    commentsCacheKey,
    removeComment
  );

  const handleDelete = async () => {
    const { error, status } = await deleteTrigger(id);

    if (error || status !== 204) {
      console.log({ status, error });
      return;
    }
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>
      {isAuthorLogedIn({ postAuthor: postAuthorId }) && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleDelete}>{isMutating ? 'Deleting...' : 'Delete'}</Button>
        </div>
      )}
    </div>
  );
}
