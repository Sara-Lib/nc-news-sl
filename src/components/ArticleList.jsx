import {use, useEffect, useState} from "react";
import SingleArticle from './SingleArticle.jsx';
import { fetchArticles } from "../api.js";
import { useLocation } from "react-router-dom";


function ArticleList({ topic }) {

    const [articleList, setArticleList] = useState([])
    const location = useLocation();
    //this is to connect with the topics bar and url params
    //it will searech for the url params and pass it on to to fetch function

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        //NEW!! potentially good and cleaner way to do this than props?
        //check with mentors if this is the best way and if everything is necessary
        const topic = params.get('topic');
        fetchArticles(topic ? { topic } : {})
          .then(({ articles }) => {
              setArticleList(articles)
              console.log(topic)

          })
          .catch(err => console.error(err));
      }, [location.search]);
      

    return (
        <div>
            {articleList.length ? (
            <ul className="article-card-list">
                    {articleList.map((article) => (
                     <SingleArticle key={article.article_id} 
                    article={article} isListed 
                    />
                    ))}
            </ul>)
            : <h3> Loading articles.. </h3>
            }
        </div>
    );
};

export default ArticleList;