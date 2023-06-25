import { isAuthorLogedIn } from '@/utils/isAuthorLogedIn';
import styles from '../../comment/comment.module.css';
import Button from '@components/button';
import { deleteReply, repliesCacheKey } from '@/api-routes/replies';
import useSWRMutation from 'swr/mutation';

export default function Reply({
  id,
  reply,
  author,
  created_at,
  postAuthorId,
  handleDelete,
}) {
  const { trigger: replyDeleteTrigger, isMutating } = useSWRMutation(
    repliesCacheKey,
    deleteReply
  );

  return (
    <div className={styles.container}>
      <p>{reply}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{created_at}</time>
      <div className={styles.buttonContainer}>
        {isAuthorLogedIn({ postAuthor: postAuthorId }) && (
          <Button onClick={() => handleDelete(id, replyDeleteTrigger)}>
            {isMutating ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </div>
    </div>
  );
}
