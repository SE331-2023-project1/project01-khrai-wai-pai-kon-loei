<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { PropType } from "vue";
import type { Student } from "@/type";
import StudentService from "@/services/StudentService";
import StudentCard from "@/components/StudentCard.vue";
import Vue from "vue";

const students = ref<Student | null>(null);

const props = defineProps({
  studentid: String,
});

StudentService.getStudentById(String(props.studentid))
  .then((response) => {
    students.value = response.data[0];
    console.log(students.value);
  })
  .catch((error) => {
    console.log(error);
  });
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
      <h1>Studentid: {{ students.studentid }}</h1>
      <p>Courselist: {{ students.courselist }}</p>
      <p>Comment:</p>
      <p>{{ students.comment }}</p>

      <div class="comment-box p-4 bg-white shadow-md rounded-lg">
        <textarea
          v-model="comment"
          placeholder="Write a comment"
          class="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
        ></textarea>
        <button
          @click="submitComment"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </div>

      <RouterView :student="student"></RouterView>
    </div>
  </main>
</template>
