import { useEffect, useState } from "react";
import React from "react";
import { fetchArticleById } from "../api.js";

function SingleArticle({ article }) {
    const [fullArticle, setFullArticle] = useState(article);

    useEffect(() => {
        fetchArticleById(article.article_id).then(({ article }) => {
          setFullArticle(article);
        });
      }, [article.article_id]);

    return (
        
        <li key={fullArticle.article_id} className="article-card-list-item">
            <h3>{fullArticle.title} </h3>
            <span> By: {fullArticle.author} </span>
            <span> Topic: {fullArticle.topic} </span>
            <img src={fullArticle.article_img_url} alt={fullArticle.title}/> 
            <span className="article-body">{fullArticle.body}</span>
        </li>

    )

    
};

export default SingleArticle;