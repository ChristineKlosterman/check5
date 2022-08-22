<template>
    <div class="posts-card card selectable">
        <div class="card-body">
            <div class="card-title">
                <h6 class="text-center">
                    {{ post.body }} - {{ new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short', day:
                                'numeric'
                        })
                    }}
                </h6>
                <div>
                    <img class="img-fluid" :src="post.imgUrl" />

                    <div class="post-creator" v-if="post.creator">
                        <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
                            <img :src="post.creator.picture" alt="" :title="post.creator.name"
                                class="selectable elevation-2 img-fluid">
                        </router-link>
                    </div>

                    <button @click="likePost()">Like?</button>
                    <div>{{ post.likes.length }}</div>

                    <div v-if="post.creator.id == account.id">
                        <button @click="deletePost(post)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from "../AppState";
import { Post } from '../models/Post';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    props: {
        post: { type: Post }
    },
    setup(props) {

        async function getLikes() {
            try {
                await postsService.getLikes()
            } catch (error) {
                logger.log('[get likes]', error)
                Pop.error(error)
            }
        }

        return {
            // editing,
            account: computed(() => AppState.account),
            likes: computed(() => AppState.likes),
            cover: computed(() => `url(${props.post.imgUrl})`),
            async deletePost(post) {
                try {
                    const yes = await Pop.confirm('Delete the post?')
                    if (!yes) { return }
                    await postsService.deletePost(post.id)
                } catch (error) {
                    logger.error('[deleting post]', error)
                    Pop.error(error)
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
</style>