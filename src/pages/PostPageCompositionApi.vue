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
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        { value: "title", name: "Title" },
        { value: "body", name: "Body" },
      ],
    };
  },
  setup() {
    const { totalPages, isLoading, posts } = usePosts(0);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      totalPages,
      isLoading,
      posts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
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
