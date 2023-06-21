import styles from './comments.module.css';
import Comment from '../comment';
import useSWR from 'swr';
import { commentsCacheKey, getComments } from '@/api-routes/comments';

export default function Comments({ postId, postAuthorId }) {
  //GET post comments
  const {
    data: { data = [] } = {},
    error,
    status,
  } = useSWR(postId ? `${commentsCacheKey}${postId}` : null, () =>
    getComments(postId)
  );

  //TODO: display 'no comments' if there is no data, otherwise the below function

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data?.map((comment) => (
        <Comment key={comment.id} {...comment} postAuthorId={postAuthorId}/>
      ))}
    </div>
  );
}
