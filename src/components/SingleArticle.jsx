import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleById } from "../api.js";

function SingleArticle({ article }) {
  const { article_id } = useParams();
  const [fullArticle, setFullArticle] = useState(article || null);
  const [loading, setLoading] = useState(!article);

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

  if (loading) return <p>Loading...</p>;
  if (!fullArticle) return <p>Article not found.</p>;

  return (
    <li className="article-card-list-item">
      <h3>
        {article ? (
          <Link to={`/articles/${fullArticle.article_id}`}>{fullArticle.title}</Link>
        ) : (
          fullArticle.title
        )}
      </h3>
      <span> By: {fullArticle.author} </span>
      <span> Topic: {fullArticle.topic} </span>
      <img src={fullArticle.article_img_url} alt={fullArticle.title} />
      <span className="article-body">{fullArticle.body}</span>
    </li>
  );
}

export default SingleArticle;
