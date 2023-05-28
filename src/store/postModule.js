import axios from "axios";

export const postModule = {
  state: () => ({
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
      });
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsLoading(state, bool) {
      state.isLoading = bool;
    },
    setSortOptions(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
    setSelectedSort(state, selectedSort) {
      state.setSelectedSort = selectedSort;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setIsLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPage",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        alert("Error");
      } finally {
        commit("setIsLoading", false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPage",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        alert("Error");
      }
    },
  },
  namespaced: true,
};
