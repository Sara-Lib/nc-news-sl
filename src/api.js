import axios from 'axios'

const ncNewsAPI = axios.create({
    baseURL: 'https://nc-news-sarali.onrender.com/api'  
})

export const fetchArticles = (params) => {
    return ncNewsAPI.get(`/articles`, { params })
      .then((res) => res.data)
      .catch((err) => {
          throw err;
        });
    };
    
    export const fetchArticleById = (id) => {
        return ncNewsAPI.get(`/articles/${id}`).then((res) => res.data);
    };
    
    export const fetchCommentsByArticleId = (article_id) => {
        return ncNewsAPI.get(`/articles/${article_id}/comments`)
        .then((res) => res.data)
}

    export const patchArticleVotes = (article_id, votes) => {
        return ncNewsAPI.patch(`/articles/${article_id}`, { inc_votes: votes })
        .then((res) => res.data)
    }

    export const postNewComment = (article_id, username, body) => {
        return ncNewsAPI.post(`/articles/${article_id}/comments`, {username, body})
        .then((res) => res.data)
    }
    
    export const deleteComment = (comment_id, username) => {
        return ncNewsAPI.delete(`/comments/${comment_id}`, {data: {username}})
        //delete works differently in axios, post automatically treats the second argument as request body but delete doesnt
        .then((res) => res.data)
    }
  

// export const postItems = (item) => {
//     console.log(item, "item to add in api func")
//     return ncNewsAPI.post(`/items`, item)
//     .then((response) => {
//         console.log(response)
//         return response.data.item
//     })
//     .catch((error) => {
//         return error
//     })
// }


// export const fetchCategories = () => {
//     return ncNewsAPI.get('/categories')
//     .then((response) => {
//         return response.data.categories
//     })
// }