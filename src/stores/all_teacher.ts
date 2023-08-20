import { defineStore } from 'pinia'
import type { Teacher } from '@/type';
export const useTeacherAllStore = defineStore('teacher_all', {
    state: () => ({
        teacher_all:[] as Teacher[]
    }),
    actions: {
        setTeacherArray(teacher : Teacher[]){
            this.teacher_all=teacher
        },
        pushNewTeacher(teacher_all : Teacher){
            this.teacher_all.push(teacher_all)
        }
    }
})