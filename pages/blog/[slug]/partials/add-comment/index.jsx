import Button from '@components/button';
import Input from '@components/input';
import Label from '@components/label';
import TextArea from '@components/text-area';
import styles from './add-comment.module.css';
import { useRef } from 'react';

import useSWRMutation from 'swr/mutation';
import { commentsCacheKey, addComment } from '@/api-routes/comments';

export default function AddComment({ postId }) {
  const formRef = useRef(); // create a reference

  const { trigger: addTrigger, isMutating } = useSWRMutation(
    postId ? `${commentsCacheKey}${postId}` : null,
    addComment
  );

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    // Alternative way to get the form data
    const formData = new FormData(event.target);

    const { author, comment } = Object.fromEntries(formData);

    //PUSH to posts comment to database
    console.log({ author, comment, postId });
    const { error, status } = await addTrigger({
      author,
      comment,
      post_id: postId,
    });

    if (error || status !== 201) {
      console.log({ status, error });
      return;
    }

    formRef.current.reset();
  };

  return (
    <div className={styles.container}>
      <h2>Add a comment</h2>
      <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor='author'>Author</Label>
          <Input id='author' name='author' />
        </div>

        <div className={styles.inputContainer}>
          <Label htmlFor='comment'>Comment</Label>
          <TextArea id='comment' name='comment' />
        </div>

        <Button className={styles.addCommentButton} type='submit'>
          {isMutating ? 'Submiting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
