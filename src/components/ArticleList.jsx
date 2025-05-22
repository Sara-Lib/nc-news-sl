import {use, useEffect, useState} from "react";
import SingleArticle from './SingleArticle.jsx';
import { fetchArticles } from "../api.js";
import { useLocation } from "react-router-dom";
import SortBar from "./SortBar.jsx";


function ArticleList({showSortBar, topic}) {

    const [articleList, setArticleList] = useState([])
    const location = useLocation();
    //this is to connect with the topics bar and url params
    //it will searech for the url params and pass it on to to fetch function

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        //NEW!! potentially good and cleaner way to do this than props?
        //check with mentors if this is the best way and if everything is necessary
        const topic = params.get('topic');
        const sort_by = params.get('sort_by');
        const order = params.get('order');

        const query = {};
        if (topic) query.topic = topic;
        query.sort_by = sort_by;
        query.order = order;

        fetchArticles(query)
          .then(({ articles }) => {
              setArticleList(articles)
              console.log(topic)

          })
          .catch(err => console.error(err));
      }, [location.search]);
      

    return (
        <div>
            {<SortBar visible={showSortBar} />}
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