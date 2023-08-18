import { createRouter, createWebHistory } from 'vue-router'
import  Student  from '../views/student/StudentListView.vue'
import StudentDetailView from '@/views/student/StudentDetailView.vue'
import StudentLayoutView from '@/views/student/StudentLayoutView.vue'
import  Teacher  from '../views/TeacherListView.vue'
import Continutors from '../views/ContrinutorsListView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'students',
      component: Student,
      props: (route) => ({page: parseInt(route.query?.page as string || '1'), pageSize: parseInt(route.query?.page as string || '2')})
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

    {
      path: '/student/:studentid',
      name: 'student-layout',
      component: StudentLayoutView,
      props: true,

      children: [
        { 
          path: '',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
      },
        
      ]
    }
  ]
})

export default router
