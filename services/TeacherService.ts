import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { Teacher } from '@/type'


const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_STUDENT,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getTeachers(perPage: number, page: number): Promise<AxiosResponse<Teacher[]>> {
    // perPage is limit
    // page is number of pages
    return apiClient.get<Teacher[]>('/teachers?_limit=' + perPage + '&_page=' + page)
  },
  getTeacherById(id : number) : Promise<AxiosResponse<Teacher>>{
    return apiClient.get<Teacher>('teachers/'+ '?teacherid='+id.toString())
  }
}