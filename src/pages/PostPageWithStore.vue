<template>
  <div>
    <h1>Posts page</h1>
    <my-input
      v-focus
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Search..."
    ></my-input>
    <div class="app__btns show-btn">
      <my-button @click="showDialogue">Create post</my-button>
      <my-select
        :options="sortOptions"
        :model-value="selectedSort"
        @update:model-value="setSelectedSearch"
      ></my-select>
    </div>
    <my-dialogue v-model:show="dialogueVisible">
      <post-form @create="createPost"></post-form>
    </my-dialogue>
    <post-list
      v-if="!isLoading"
      @remove="removePost"
      :posts="sortedAndSearchedPosts"
    ></post-list>
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialogue from "@/components/UI/MyDialogue";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    MySelect,
    MyButton,
    MyDialogue,
    PostForm,
    PostList,
  },
  name: "App",
  data() {
    return {
      dialogueVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchUsers: "post/fetchPosts",
    }),
    createPost(post) {
      this.dialogueVisible = false;
      this.posts.push(post);
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialogue() {
      this.dialogueVisible = true;
    },
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    ...mapState({
      isLoading: "post/isLoading",
      selectedSort: "post/selectedSort",
      sortOptions: "post/sortOptions",
      searchQuery: "post/searchQuery",
      page: "post/page",
      limit: "post/limit",
      totalPage: "post/totalPage",
      posts: "post/posts",
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
};
</script>

<style>
.show-btn {
  margin: 15px 0;
}

.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
