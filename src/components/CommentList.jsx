import { useEffect, useState } from "react";
import { fetchCommentsByArticleId, postNewComment } from "../api.js";

function CommentList({ article_id , currentUser}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then(({ comments }) => setComments(comments))
      .catch((err) => console.log(err));
  }, [article_id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setPosting(true);
    if (!newComment.trim()) {
        setError("Write your comment before submitting.");
        return;
      }
    postNewComment(article_id, currentUser, newComment)
    .then(() => fetchCommentsByArticleId(article_id))
    .then(({ comments }) => {
      setComments(comments);
      setNewComment("");
      setPosting(false);
    })
    .catch((err) => {
        setError("Error posting a comment. Please try again.")
        console.log(err);
        setPosting(false);
    })
  }

  return (
    <>
   <form id="post-comment" onSubmit={handleCommentSubmit}>
    <input type="text" className="post-comment-input"
        value={newComment} onChange={(e) => setNewComment(e.target.value)}
    />
    <button type="submit">Submit</button>
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
        </li>
      ))}
    </ul>
    </>
  );
}

export default CommentList;
