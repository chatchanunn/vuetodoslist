import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://65af482c2f26c3f2139a5bf4.mockapi.io'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses : ['Pending', 'Doing', 'Done']
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error) {
        console.error('Error loading todos:', error)
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error) {
        console.error('Error loading todos selected:', error)
      }      
    },
    async addTodo (todoText) {
      // ชื่อของ Todo
      const bodyData = {
        name: todoText,
        status: 'Pending'
      }

      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        this.list.push(response.data) // ถ้าไม่จำเป็นก็ไม่ต้องใช้ ถ้าต้องคำนวนอะไรก่อนก็ไม่ควรใช้วิธีนี้
        console.log(' add complete')
        
      } catch (error) {
        console.error('Error loading todos selected:', error)
      }  
    },
    async editTodo (todoData, id) {
      // ชื่อของ Todo
      /*
      { 
        name: 'test',
        status: 'Doing'
      }
      */
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log(' edit complete')
      } catch (error) {
        console.error('Error loading todos selected:', error)
      }  
    },
    async removeTodo (id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log(' remove complete')
      } catch (error) {
        console.error('Error loading todos selected:', error)
      }  
    }
  }
})
