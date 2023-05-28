<template>
  <div v-if="posts.length">
    <h3>Posts</h3>
    <transition-group name="post-list">
      <post-item
        :key="post.id"
        v-for="post in posts"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else class="header">Post list is empty</h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: "PostList",
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.header {
  color: red;
}
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-move {
  transition: transform 0.4s ease;
}
</style>
