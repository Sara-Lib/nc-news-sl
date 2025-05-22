import { useEffect, useState } from "react";
import { deleteComment, fetchCommentsByArticleId, postNewComment } from "../api.js";

function CommentList({ article_id , currentUser}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then(({ comments }) => setComments(comments))
      .catch((err) => console.log(err));
  }, [article_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
        setError("Write your comment before submitting.");
        return;
      }
    postNewComment(article_id, currentUser, newComment)
    .then(() => fetchCommentsByArticleId(article_id))
    .then(({ comments }) => {
        setComments(comments);
        setNewComment("");
    })
    .catch((err) => {
        setError("Error posting a comment. Please try again.")
        console.log(err);
    })
}

    const handleDelete = (comment_id, author) => {
        if (currentUser !== author) {
            console.log(currentUser, author, comment_id)
            setError("You can only delete your own comments.");
            return;
          }
        deleteComment(comment_id, currentUser)
        .then(() => fetchCommentsByArticleId(article_id))
        .then(({ comments }) => {
            setComments(comments);
        })
        .catch((err) => {
                setError("Error deleting a comment. Please try again.")
                console.log(comment_id, currentUser, "<<<<<")
                console.log(err);
            })
    }

  return (
    <>
   <form id="post-comment" className="post-comment" onSubmit={handleCommentSubmit}>
    <input className="post-comment" type="text"
        value={newComment} onChange={(e) => setNewComment(e.target.value)}
    />
    <button type="submit">Post a comment</button>
    <span className="error-text">{error}</span>
   </form>
   <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.comment_id} className="comment-card">
          <span className="author-name">{comment.author}</span>
          <span className="comment-votes">Votes: {comment.votes}</span>
          <span className="comment-time">
            {new Date(comment.created_at).toLocaleString()}
          </span>
          <span className="comment-body">{comment.body}</span>
          {currentUser === comment.author && (
            <button onClick={() => handleDelete(comment.comment_id, comment.author)}>Delete</button>
            )}
        </li>
      ))}
    </ul>
    </>
  );
}

export default CommentList;
