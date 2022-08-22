import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  posts: [],

  verts: [],

  profilePosts: [],

  activeProfile: null,

  activePost: null,

  page: 0,

  likes: [],

  nextPage: null,

  previousPage: null,

  likeId: []



})
