<template>
  <div>
    <h1>Posts page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Search"></my-input>
    <div class="app__btns show-btn">
      <my-button @click="showDialogue">Create post</my-button>
      <my-select :options="sortOptions" v-model="selectedSort"></my-select>
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
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {
    MyInput,
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
      isLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Body" },
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPage: 0,
      posts: [],
    };
  },
  methods: {
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
    async loadMorePosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
        this.page += 1;
      } catch (e) {
        alert("Error");
      }
    },
  },
  mounted() {
    this.loadMorePosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    page() {
      this.loadMorePosts();
    },
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
