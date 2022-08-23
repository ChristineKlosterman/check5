<template>


    <div class="col-2" v-for="v in verts" :key="v.id">

        <img :verts="v" :src="v.square" />

    </div>
    <div v-if="profile">
        <div v-if="profile.id == account.id">
            <router-link class="btn btn-warning" :to="{ name: 'Account' }">Edit</router-link>
        </div>
        <img :src="profile.picture" alt="" height="100" />
        <h4>{{ profile.name }}</h4>
        <p>{{ profile.bio }}</p>
        <a>{{ profile.linkedin }} | {{ profile.github }}</a>
        <p>Graduated? {{ profile.graduated }}</p>
        <p>{{ profile.class }}</p>
        <img :src="profile.coverImg" />
        <a :src="profile.resume"></a>
    </div>

    <div class="row">
        <div class="mx-auto my-3 col-md-10" v-for="p in posts" :key="p.id">
            <PostsCard :post="p" />
        </div>
    </div>
    <div class="row mb-5 pb-5">
        <div class="col-6 text-end">
            <button @click="changePage(previousPage)" class=" selectable btn btn-outline-dark text-dark w-50"
                :disabled="!previousPage">
                Previous
            </button>
        </div>
        <div class="col-6">
            <button @click="changePage(nextPage)" class="selectable btn btn-outline-dark text-dark w-50"
                :disabled="!nextPage">
                Next
            </button>
        </div>
    </div>




</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import { vertsService } from "../services/VertsService";
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    setup() {
        const route = useRoute()

        async function getVerts() {
            try {
                await vertsService.getVerts()
            } catch (error) {
                logger.log('[getting verts]', error)
                Pop.error(error)
            }
        }

        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(route.params.profileId)
            } catch (error) {
                logger.log('[getting posts by id]', error)
                Pop.error(error)
            }
        }

        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId)
            } catch (error) {
                logger.log('[getting profile by id]', error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getProfileById()
            getPostsByCreatorId()
            getVerts()
        })

        return {
            account: computed(() => AppState.account),
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.profilePosts),
            verts: computed(() => AppState.verts),
            cover: computed(() => `url(${AppState.activeProfile?.coverImg || 'https://cdn.pixabay.com/photo/2017/07/16/17/33/background-2509983_1280.jpg'})`),
            nextPage: computed(() => AppState.nextPage),
            previousPage: computed(() => AppState.previousPage),
            async changePage(url) {
                try {
                    await postsService.changePage(url);
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }

}
</script>