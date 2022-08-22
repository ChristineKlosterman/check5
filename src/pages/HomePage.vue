<template>
  <div v-for="v in verts" :key="v.id">

    <img :verts="v" :src="v.banner" />

  </div>


  <div class="container">

    <div class="row">
      <div class="col-md-10 col-sm-4 m-auto my-3">
        <PostsForm />
      </div>
      <div class="col-md-8 col-sm-4" v-for="p in posts" :key="p.id">
        <PostsCard :post="p" />
      </div>
      <img class="col-2" :src="verts.tall" />
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
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { onMounted } from "vue";
import { postsService } from '../services/PostsService';
import { vertsService } from "../services/VertsService";
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
  setup() {

    async function getVerts() {
      try {
        await vertsService.getVerts()
      } catch (error) {
        logger.log('[getting verts]', error)
        Pop.error(error)
      }
    }
    async function getPosts(page) {
      try {
        await postsService.getPosts(page);
      }
      catch (error) {
        logger.log("[getting posts]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPosts();
      getVerts();
      console.log(AppState.verts);
    });
    return {
      posts: computed(() => AppState.posts),
      verts: computed(() => AppState.verts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      async changePage(url) {
        try {
          await postsService.changePage(url);
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },

}

</script>

<style scoped lang="scss">
</style>
