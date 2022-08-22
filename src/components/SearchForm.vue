<template>
    <div class="search-form">
        <form @submit.prevent="searchPosts">
            <div class="input-group">
                <input class="form-control" type="text" v-model="query" />
                <button class="btn btn-primary" type="submit">
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/postsService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
    setup() {
        const query = ref('')
        return {
            query,
            async searchPosts() {
                try {
                    await postsService.getPostsBySearch(query.value)
                    query.value = ''
                } catch (error) {
                    logger.error('[Searching Posts]', error)
                    Pop.error(error)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped>
</style>
