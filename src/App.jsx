import { useState } from 'react'
import { Routes, Route} from "react-router-dom";
import './App.css'
import Header from "../src/components/Header.jsx";
import Home from "../src/components/Home.jsx";
import Navbar from "../src/components/Navbar.jsx";
import ArticleList from "../src/components/ArticleList.jsx";
import SingleArticle from './components/SingleArticle.jsx';
import UserList from "../src/components/UserList.jsx";
import TopicList from "../src/components/TopicList.jsx";

function App() {
  const pageTitle = "NC News by Sara L"
  const [currentUser, setCurrentUser] = useState("jessjelly")

  return (
    <div className='App'>

    <Navbar currentUser={currentUser}/>
    <Header name={pageTitle} />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/articles" element={<ArticleList showSortBar={true} />}/>
      <Route path="/articles/:article_id" element={<SingleArticle currentUser={currentUser}/>} />
      <Route path="/topics" element={<TopicList/>}/>
      <Route path="/users" element={<UserList/>}/>

    </Routes>



    </div>
  )
}

export default App;
