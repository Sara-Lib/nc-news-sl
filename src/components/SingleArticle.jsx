import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId, patchArticleVotes } from "../api.js";

function SingleArticle({ article, isListed}) {
  const { article_id } = useParams();
  const [fullArticle, setFullArticle] = useState(article || null);
  const [loading, setLoading] = useState(!article);
  const [comments, setComments] = useState([])
  const [votes, setVotes] = useState(null)

  useEffect(() => {
    if (article_id && !article) {
      fetchArticleById(article_id)
        .then(({ article }) => {
          setFullArticle(article);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [article_id, article]);

  useEffect(() => {
    if (article_id && !article) {
    fetchCommentsByArticleId(article_id)
    .then(({ comments }) => setComments(comments))
    }
  }, [article_id])

  useEffect(() => {
    if (fullArticle) {
      setVotes(fullArticle.votes);
    }
  }, [fullArticle]);

  if (loading) return <p>Loading...</p>;
  if (!fullArticle) return <p>Article not found.</p>;

  const handleUpvote = () => {
    patchArticleVotes(fullArticle.article_id,1)
    .then(()=> setVotes(votes+1))
    .catch((err) => console.log(err))
  }

  const handleDownvote = () => {
    patchArticleVotes(fullArticle.article_id,-1)
    .then(()=> setVotes(votes-1))
    .catch((err) => console.log(err))
  }

  return (
    <li className="article-card-list-item">
      <h2 className={isListed ? "listed-article-title" : ""}>
        {/* this is to change the size in the list to smaller but still have it h2 when clicked */}
        {article ? (
          <Link to={`/articles/${fullArticle.article_id}`}>{fullArticle.title}</Link>
        ) : (
          fullArticle.title
        )}
      </h2>
      <span className="author-name"> By: {fullArticle.author} </span>
      <span className="topic-name"> Topic: {fullArticle.topic} </span>
      <img src={fullArticle.article_img_url} alt={fullArticle.title} />
      <span className="comment-votes">Votes: {votes}
        <button onClick={handleUpvote}>↑</button>
        <button onClick={handleDownvote}>↓</button>
      </span>
      <span className="article-body">{fullArticle.body}</span>

    <ul className="comment-list">
        {comments.map(comment => (
            <li key={comment.comment_id}className="comment-card">
                <span className="author-name"> {comment.author}</span>
                <span className="comment-votes"> Votes: {comment.votes} </span>
                <span className="comment-time"> {new Date(comment.created_at).toLocaleString()} </span>
                <span className="comment-body"> {comment.body} </span>

            </li>
        ))}

    </ul>
    </li>
  );
}

export default SingleArticle;
