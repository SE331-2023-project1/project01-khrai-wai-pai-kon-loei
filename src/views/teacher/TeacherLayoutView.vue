<script setup lang="ts">
import { ref } from "vue";
import { Teacher } from "@/type";
import TeacherService from "@/services/TeacherService";

const props = defineProps({
  teacherID: String,
});

const teacher = ref<Teacher | null>(null);

TeacherService.getTeacherById(String(props.teacherID))
  .then((teacherResponse) => {
    teacher.value = teacherResponse.data[0];
    console.log(teacher.value);
  })
  .catch((error) => {
    console.log(error);
  });

// const newComment = ref("");
// const comments = ref([]);

// function submitComment() {
//   if (newComment.value.trim() !== "") {
//     comments.value.push(newComment.value);
//     newComment.value = ""; // Clear the input after submitting
//   }
// }

// function deleteComment(index: number) {
//   comments.value.splice(index, 1);
// }
</script>

<template>
  <main class="container">
    <!-- Student information -->
    <div v-if="teacher">
      <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div class="flex items-center space-x-4">
          <img
            class="w-24 h-24 object-cover rounded-full shadow-lg"
            :src="teacher.profileimage"
          />
          <div>
            <h1 class="text-2xl font-semibold">
              {{ teacher.name }} {{ teacher.surname }}
            </h1>
            <h1 class="text-lg">{{ teacher.teacherID }}</h1>
            <h1 class="text-lg">{{ teacher.courselist }}</h1>
          </div>
        </div>

          
        <!-- Comments section -->
        <!-- <div class="border-t border-gray-300 pt-4">
          <h2 class="text-lg font-semibold">Comment</h2>
          <p class="mb-2">{{ student.comment }}</p>

          <div class="mt-4">
            <div
              v-for="(comment, index) in comments"
              :key="index"
              class="bg-gray-100 p-2 rounded-lg mb-2 flex justify-between items-center"
            >
              <span>{{ comment }}</span>
              <button @click="deleteComment(index)" class="text-red-500">
                Delete
              </button>
            </div>
          </div>

          <div class="comment-box mt-4">
            <textarea
              v-model="newComment"
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
        </div> -->
      </div>
    </div>


  </main>
</template>
