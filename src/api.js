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