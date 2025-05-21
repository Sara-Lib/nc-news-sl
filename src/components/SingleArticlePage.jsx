import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api.js";
import SingleArticle from "./SingleArticle.jsx";

function SingleArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [article_id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <ul>
      <SingleArticle article={article} />
    </ul>
  );
}

export default SingleArticlePage;
