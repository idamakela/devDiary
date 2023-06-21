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
  const { trigger: deleteTrigger } = useSWRMutation(
    commentsCacheKey,
    removeComment
  );

  //console.log({ postAuthorId });

  const handleDelete = async () => {
    //console.log({ id, message: 'will now be deleted' });
    const { error, status } = await deleteTrigger(id);
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>
      {isAuthorLogedIn({ postAuthor: postAuthorId }) && (
        <div className={styles.buttonContainer}>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      )}
    </div>
  );
}
