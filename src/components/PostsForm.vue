<template>
    <form @submit.prevent="handleSubmit">

        <p>Create a Post</p>
        <input type="text" placeholder="body" v-model="editable.body" />
        <input type="text" placeholder="Img" v-model="editable.imgUrl" />
        <button class="btn btn-primary">{{ editable.id ? 'Save' : 'Create' }}</button>

    </form>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    setup() {
        const editable = ref({})

        watchEffect(() => {
            if (!AppState.activePost) { return }
            editable.value = { ...AppState.activePost }
        })

        return {
            editable,
            async handleSubmit() {
                try {
                    await postsService.createPost(editable.value)
                    Pop.success('project created~!')
                } catch (error) {
                    logger.log('[handle submit]', error)
                    Pop.error(error)
                }
            }
        }
    }
}
</script>