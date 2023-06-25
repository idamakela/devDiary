import Button from '@components/button';
import styles from './comment.module.css';
import useSWRMutation from 'swr/mutation';
import { commentsCacheKey, removeComment } from '@/api-routes/comments';
import { isAuthorLogedIn } from '@/utils/isAuthorLogedIn';
import useSWR from 'swr';
import { getReplies, repliesCacheKey } from '@/api-routes/replies';
import Reply from '../partials/reply';

export default function Comment({
  comment,
  created_at,
  author,
  id,
  postAuthorId,
}) {
  //GET post comments
  const {
    data: { data = [] } = {},
    error,
    status,
  } = useSWR(id ? `${repliesCacheKey}${id}` : null, () => getReplies(id));

  const { trigger: deleteTrigger, isMutating } = useSWRMutation(
    commentsCacheKey,
    removeComment
  );

  const handleDelete = async (id, trigger) => {
    const { error, status } = await trigger(id);

    if (error || status !== 204) {
      console.log({ status, error });
      return;
    }

    console.log(
      `${
        trigger === 'deleteTrigger' ? 'Comment' : 'Reply'
      } will be deleted, id: ${id}`
    );
  };

  const handleReply = () => {
    console.log('hi, this should send user to add-reply');
  };

  return (
    <>
      <div className={styles.container}>
        <p>{comment}</p>
        <p className={styles.author}>{author}</p>
        <time className={styles.date}>{created_at}</time>
        <div className={styles.buttonContainer}>
          {isAuthorLogedIn({ postAuthor: postAuthorId }) && (
            <Button onClick={() => handleDelete(id, deleteTrigger)}>
              {isMutating ? 'Deleting...' : 'Delete'}
            </Button>
          )}
          <Button onClick={handleReply}>Reply</Button>
        </div>
      </div>
      {/* {add-reply} */}
      {data?.map((reply) => (
        <Reply
          key={reply.id}
          {...reply}
          postAuthorId={postAuthorId}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
}
