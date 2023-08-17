import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'
import  Student  from '../views/StudentListView.vue'; 
import  Teacher  from '../views/TeacherListView.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'students',
      component: Student,
    },
    {
      path: '/teacher',
      name: 'teachers',
      component: Teacher,
    },
  ]
})

export default router
