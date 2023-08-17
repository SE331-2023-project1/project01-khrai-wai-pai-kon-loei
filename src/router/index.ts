import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'
import  Student  from '../views/StudentListView.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'students',
      component: Student,
    },
  ]
})

export default router
