<script setup  lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { PropType } from "vue";
import type { Student } from '@/type'
import StudentService from '@/services/StudentService';
import  StudentCard  from "@/components/StudentCard.vue";


const students = ref<Student | null> (null)
const props = defineProps({
    studentid: String
})
    StudentService.getStudentById(String(props.studentid)).then((response) => {
        students.value = response.data[0]
        console.log(students.value)
    }).catch(error => {
        console.log(error)
    })

</script>


<template>
    <main class="container">
        <!-- <StudentCard v-for="student in students" :key="student.studentid" :student="student"></StudentCard> -->
        <div v-if="students">
        <img
          class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
          :src="students?.profileimage"
        />
       <h1>Name: {{ students.name }} {{ students.surname }}</h1>
       <h1>Studentid: {{students.studentid}}</h1>
       <p>Courselist: {{students.courselist}}</p>
       <p>Comment:</p>
       <p>{{ students.comment }}</p>

       <RouterView :student="student"></RouterView>
    </div>
    
    </main>

    
  </template>





<!-- <script setup  lang="ts">
import { ref } from 'vue'
import type { Student } from '@/type'
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router';

const student = ref<Student | null> (null)
const props = defineProps({
    studentid: String
})

const router = useRouter()
    StudentService.getStudentById(String(props.studentid)).then((response) => {
    student.value = response.data
    }).catch(error => {
        console.log(error)
        if (error.response && error.response.status === 404 ) {
         router.push({ name: '404-resource', params: { resource: 'student'} })
        }else {
            router.push({ name: 'network-error' })
        }
    })


</script>
<template>
    <div v-if="student">
        <img
          class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
          :src="student?.profileimage"
        />
       <h2>{{ student.name }} {{ student.surname }}</h2>
       <div id="nav">
            <RouterLink :to="{ name: 'student-detail', params: { studentid} }">Details</RouterLink>
            <RouterLink :to="{ name: 'student-edit', params: { studentid} }">Edit</RouterLink>
       </div>

       

       <RouterView :student="student"></RouterView>
       </div>
       
</template> -->
