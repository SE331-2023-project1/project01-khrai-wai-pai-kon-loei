import { defineStore } from 'pinia'
import type { Student } from '@/type';
export const useStudentAllStore = defineStore('student_all', {
    state: () => ({
        student_all: [] as Student[],
    }),
    actions: {
        setStudentArray(student : Student[]){
            this.student_all=student
        },
        pushNewStudent(student_all : Student){
            this.student_all.push(student_all)
        }
    }
})