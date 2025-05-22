import {useEffect, useState} from "react";
import { fetchTopics } from "../api";
import {Link} from 'react-router-dom';

function TopicList() {

    const [topicList, setTopicList] = useState([])

    useEffect(() => {
        fetchTopics()
          .then(({ topics }) => {
            setTopicList(topics);
          })
          .catch(err => console.error(err));
      }, []);
      

        return (
            <div>
                <nav className="topic-bar">
                    <span>Choose the topic: </span>
                    <ul className="topic-bar">
              {topicList.map((topic) => (
                    <li key={topic.slug}>
                        <Link to={`/articles/?topic=${topic.slug}`}>{topic.slug} </Link></li>
                ))}
                </ul></nav>
            </div>
          );
        }

export default TopicList;