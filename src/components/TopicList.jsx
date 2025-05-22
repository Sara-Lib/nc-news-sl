import { useEffect, useState } from "react";
import { fetchTopics } from "../api";
import { Link, useLocation } from "react-router-dom";
import ArticleList from "./ArticleList";

function TopicList() {
  const [topicList, setTopicList] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const topic = params.get("topic");

  useEffect(() => {
    fetchTopics()
      .then(({ topics }) => setTopicList(topics))
      .catch(console.error);
  }, []);

  return (
    <>
      <div>
        <h2>{topic ? `Articles about ${topic}` : "Choose a topic"}</h2>
        {/* this is not working, ask tutors why */}
        <nav className="topic-bar">
          <ul className="topic-bar">
            {topicList.map(({ slug }) => (
              <li key={slug}>
                <Link to={`/articles/?topic=${slug}`}>{slug}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ArticleList showSortBar={false} key={location.search}  />
    </>
  );
}

export default TopicList;
