import { createRouter, createWebHistory } from 'vue-router'
import  Student  from '../views/StudentListView.vue'; 
import  Teacher  from '../views/TeacherListView.vue';
import Continutors from '../views/ContrinutorsListView.vue';

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
    {
      path: '/',
      name: 'home',
      component: Continutors,
    },
  ]
})

export default router
