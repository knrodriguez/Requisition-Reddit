import axios from 'axios';

const GET_MY_POSTS = 'GET_MY_POSTS';
const GET_REDDIT_POSTS = 'GET_REDDIT_POSTS';

export const getPosts = (posts, from) => ({
    type: from === 'reddit' ? GET_REDDIT_POSTS : GET_MY_POSTS,
    posts
})

export const getPostsFromReddit = (reqId) => {
    return async (dispatch) => {
        try {
            console.log('ReqId in THUNK:',reqId);
            const { data } = await axios.get(`/api/reddit/${reqId}`);
            console.log(data);
            dispatch(getPosts(data, 'reddit'));
        } catch (error) {
            console.log('Error inside getPostsFromReddit thunk', error);
        }
    }
}

export const getPostsFromDb = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/posts`);
            dispatch(getPosts(data, 'db'));
        } catch (error) {
            console.log('Error inside getPostsFromDb thunk', error);
        }
    }
}

export default (state = [], action) => {
    switch(action.type){
        case GET_MY_POSTS:
            return [...state, ...action.posts];
        case GET_REDDIT_POSTS:
            return [...state, ...action.posts];
        default:
            return state;
    }
}