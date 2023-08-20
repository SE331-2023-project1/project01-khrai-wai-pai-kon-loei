import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: [] as string[],
  }),
  actions: {
    addComment(comment: string) {
      this.comments.push(comment);
    },
  },
});
