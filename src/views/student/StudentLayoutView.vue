<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Student } from "@/type";
import StudentService from "@/services/StudentService";
import { Teacher } from "@/type";
import TeacherService from "@/services/TeacherService";
import { useCommentsStore } from "@/stores/comment";

const commentsStore = useCommentsStore();

const studentComments = ref<{ [studentId: string]: string[] }>({});

const props = defineProps({
  studentid: String,
  teacherID: String,
});

const student = ref<Student | null>(null);
const teacher = ref<Teacher | null>(null);
const comments = ref<string[]>([]);
const newComment = ref("");

const loadComments = async () => {
  if (student.value) {
    if (!(student.value.studentid in studentComments.value)) {
      studentComments.value[student.value.studentid] = [];
    }
    comments.value = studentComments.value[student.value.studentid];
  }
};

onMounted(async () => {
  const studentResponse = await StudentService.getStudentById(props.studentid);
  student.value = studentResponse.data[0];
  loadComments();
});

function submitComment() {
  if (newComment.value.trim() !== "") {
    if (!(student.value.studentid in studentComments.value)) {
      studentComments.value[student.value.studentid] = [];
    }
    studentComments.value[student.value.studentid].push(newComment.value);
    newComment.value = ""; // Clear the input after submitting
  }
}

StudentService.getStudentById(String(props.studentid))
  .then((studentResponse) => {
    student.value = studentResponse.data[0];
    console.log(student.value);

    // Fetch the associated teacher using the student's teacherID
    StudentService.getTeacherByStudent(student.value) // Use the new function
      .then((teacherResponse) => {
        teacher.value = teacherResponse.data[0];
        console.log(teacher.value);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

// const newComment = ref("");

// function submitComment() {
//   if (newComment.value.trim() !== "") {
//     commentsStore.addComment(newComment.value);
//     newComment.value = ""; // Clear the input after submitting
//   }
// }

// function deleteComment(index: number) {
//   commentsStore.deleteComment(index);
// }
</script>

<template>
  <main class="container">
    <!-- Student information -->
    <div v-if="student">
      <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div class="flex items-center space-x-4">
          <img
            class="w-24 h-24 object-cover rounded-full shadow-lg"
            :src="student.profileimage"
          />
          <div>
            <h1 class="text-2xl font-semibold">
              {{ student.name }} {{ student.surname }}
            </h1>
            <h1 class="text-lg">{{ student.studentid }}</h1>
            <h1 class="text-lg">{{ student.courselist }}</h1>
            <h1 class="text-lg">{{ student.teacherID }}</h1>
          </div>
        </div>

        <!-- Teacher information -->

        <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
          <h1 class="text-xl">Teacher :</h1>
          <div class="flex items-center space-x-4">
            <img
              class="w-24 h-24 object-cover rounded-full shadow-lg"
              :src="teacher?.profileimage"
            />
            <div>
              <h1 class="text-2xl font-semibold">
                {{ teacher?.name }} {{ teacher?.surname }}
              </h1>
              <h1 class="text-lg">{{ teacher?.courselist }}</h1>
              <h1 class="text-lg">{{ teacher?.teacherID }}</h1>
            </div>
          </div>
        </div>

        <!-- Comments section
        <div class="border-t border-gray-300 pt-4">
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

        <!-- Comments section -->
        <div class="border-t border-gray-300 pt-4">
          <h2 class="text-lg font-semibold">All Comments</h2>
          <div v-for="(comment, index) in comments" :key="index">
            <p>{{ comment }}</p>
          </div>
        </div>

        <!-- Add Comment section -->
        <div class="border-t border-gray-300 pt-4">
          <h2 class="text-lg font-semibold">Add Comment</h2>
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
        </div>
      </div>
    </div>
  </main>
</template>
