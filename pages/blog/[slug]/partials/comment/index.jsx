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

  let addReply = false;

  const handleReply = () => {
    addReply = true;
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>
      <div className={styles.buttonContainer}>
        {isAuthorLogedIn({ postAuthor: postAuthorId }) && (
          <Button onClick={handleDelete}>
            {isMutating ? 'Deleting...' : 'Delete'}
          </Button>
        )}
        <Button
          onClick={() =>
            console.log('hi, adding a reply should happen if i click this!')
          }
        >
          Reply
        </Button>
      </div>
    </div>
  );
}
