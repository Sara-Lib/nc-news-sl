import ArticleList from "./ArticleList";

function Home({ showSortBar }){
    return (
    
        <div>
            Welcome to the NC News page!
            <ArticleList showSortBar={false} />
        </div>
    );
}


export default Home;
