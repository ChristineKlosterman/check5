import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { api } from "./AxiosService"
import { logger } from "../utils/Logger";


class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.page = res.data.page
    }

    async getLikes(likeId) {
        const res = api.get(`api/posts/like`)
        AppState.likes = res.data.likes.map(l => new likeId(l))
    }

    // async likePost(likeId){
    //     let url = api.post(`api/posts/${likeId}/like`)
    //     await api.post(url)
    //     AppState.posts.likes = AppState.posts.likes.filter
    // }

    async createPost(postData) {
        const res = await api.post('/api/posts', postData)
        AppState.posts.unshift(new Post(res.data))
    }

    async getPostsByCreatorId(creatorId) {
        const res = await api.get('api/posts', {
            params: {
                creatorId
            }
        })
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
    }

    async deletePost(postId) {
        let url = `/api/posts/${postId}`
        await api.delete(url)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }

    async getPostsBySearch(searchTerm) {
        const res = await api.get('/api/posts', {
            params: {
                query: searchTerm
            }
        })
        AppState.posts = res.data.posts.map(p => new Post(p))
    }

    async changePage(url) {
        const res = await api.get(url)
        logger.log(res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }
}

export const postsService = new PostsService()