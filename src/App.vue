<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { onMounted } from 'vue';
import TeacherService from "@/services/TeacherService";
import { useTeacherAllStore } from "@/stores/all_teacher";
import StudentService from '@/services/StudentService'
import { useStudentAllStore } from '@/stores/all_student'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';


const store = useMessageStore()
const { message } = storeToRefs(store)
const studentStore_all = useStudentAllStore();
const teacherStoreAll = useTeacherAllStore();

onMounted(async () => {
  try {
    const response = await TeacherService.getTeachers();
    teacherStoreAll.setTeacherArray(response.data);
  } catch (error) {
    console.error(error);
  }
})

// onMounted(async () => {
//   try {
//     const response = await StudentService.getStudents();console.log('k',response);
//     studentStore_all.setStudentArray(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// });


</script>

<template>
  <header>
    <div class="app">
      <Sidebar />

      <div id="flashMessage" v-if="message">
        <h4> {{ message }} </h4>
      </div>
      <RouterView />

    </div>

  </header>
</template>


<!-- <template>
  <header>
    <div class="app">
     <Sidebar/>
      <router-view/> 
    </div>
  </header>
  
</template> -->

<style lang="scss">
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

body {
  background: rgb(197, 135, 210);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: #42b983;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-weight: bold;
  color: #2c3e50;
  font-size: 1.1rem;
}

nav a:first-of-type {
  border: 0;
}
</style>
