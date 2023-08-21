import { createRouter, createWebHistory } from 'vue-router'
import StudentlayoutView from '@/views/student/StudentLayoutView.vue'
import StudentDetailView from '@/views/student/StudentDetailView.vue'
import StudentService from '@/services/StudentService'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student';
import { useStudentAllStore } from '@/stores/all_student';
import { ref } from 'vue'
import NProgress from 'nprogress'
import Student from "../views/student/StudentListView.vue";
import Teacher from "../views/teacher/TeacherListView.vue";
import TeacherDetailView from "@/views/teacher/TeacherDetailView.vue";
import TeacherLayoutView from "@/views/teacher/TeacherLayoutView.vue";
import Continutors from "../views/ContrinutorsListView.vue";
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/student",
      name: "students",
      component: Student,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
        pageSize: parseInt((route.query?.page as string) || "2"),
      }),
    },
    {
      path: '/form',
      name: 'form',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StudentForm.vue')
    },
    {
      path: "/teacher",
      name: "teachers",
      component: Teacher,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || "1"),
        pageSize: parseInt((route.query?.page as string) || "2"),
      }),
    },
    {
      path: "/",
      name: "home",
      component: Continutors,
    },

    {
      path: '/student/:studentid',
      name: 'student-layout',
      component: StudentlayoutView,
      props: true,
      beforeEnter: (to) => {
        const studentid: number = parseInt(to.params.id as string) || 0;
        const studentStore = useStudentStore();
        const studentStore_all = useStudentAllStore();
        const { student_all } = storeToRefs(studentStore_all);
        console.log(student_all.value);
        const keep = student_all.value[studentid - 1];
        console.log(keep);
        studentStore.setStudent(keep);
      },

      children: [
        {
          path: "",
          name: "student-detail",
          component: StudentDetailView,
          props: true,
        },
      ],
    },
    {
      path: "/teacher/:teacherID",
      name: "teacher-layout",
      component: TeacherLayoutView,
      props: true,

      children: [
        {
          path: "",
          name: "teacher-detail",
          component: TeacherDetailView,
          props: true,
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView,
      props: true
    },
  ],
});
router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

