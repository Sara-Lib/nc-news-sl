import {useEffect, useState} from "react";
import SingleArticle from './SingleArticle.jsx';
import { fetchArticles } from "../api.js";

function ArticleList({ category }) {

    const [articleList, setArticleList] = useState([])

    useEffect(() => {
        fetchArticles()
          .then(({ articles }) => setArticleList(articles))
          .catch(err => console.error(err));
      }, []);
      

    return (
        <div>
            {articleList.length ? (
            <ul className="article-card-list">
                    {articleList.map((article) => (
                    <SingleArticle key={article.article_id} article={article} />
                    ))}
            </ul>)
            : <h3> No articles found in selected category.</h3>
            }
        </div>
    );
};

export default ArticleList;