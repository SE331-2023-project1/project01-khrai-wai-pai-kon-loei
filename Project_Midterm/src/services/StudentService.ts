import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { Student } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3004/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getStudents(perPage: number, page: number): Promise<AxiosResponse<Student[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<Student[]>('/students?_limit=' + perPage + '&_page=' + page)
  },
  getStudentById(id : number) : Promise<AxiosResponse<Student>>{
    return apiClient.get<Student>('students/'+ '?studentid='+id.toString())
  }
}