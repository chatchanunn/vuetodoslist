<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const todoText = ref('')

onMounted( async() => {
    await todoStore.loadTodos()
    console.log(todoStore.list)
})

const addTodo = async (todoText) => {
    try {
        await todoStore.addTodo(todoText)
        // await todoStore.loadTodos()
        // or
        
    } catch (error) {
        console.log(error)
    }
}

const editStatus = async (todoData, todoId ) => {
    try {
        console.log("edit status...")
        const updateData = {
            name : todoData.name,
            status : todoData.status
        }
        await todoStore.editTodo(updateData, todoId)
        // await todoStore.loadTodos()
        // or
        
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div>
        HomeView
        <div>
            <input type="text" v-model="todoText">
            <button @click="addTodo(todoText)">Add Todo</button>
        </div>
        <ul>
            <li v-for="todo in todoStore.list" @change="editStatus(todo, todo.id)">
                {{todo.name}} 
                
                <select v-model="todo.status">
                    <option> Select Status </option>
                    <option 
                        v-for="status in todoStore.statuses" 
                        :value="status">
                        {{status}}
                    </option>
                </select>
                
                {{ todo.status }}
                <button> Edit </button>
                <button> Delte </button>
            </li>
        </ul>
    </div>
</template>