<template>
    <div class="bg-gray-900 text-white min-h-screen p-8">
      <div class="max-w-5xl mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold">Task Management</h1>
          <button
            @click="openModalAddTask"
            class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Add Tasks
          </button>
        </div>
        <CreateTaskManagementModal 
            v-if="isOpenModalAddTask"
            :isVisible="isOpenModalAddTask"
            title="Add New Task"
            @close="closeModalAddTask"
            @update-task="updateTasks"
        />
        <UpdateTaskManagementModal 
            v-if="isOpenModalEditTask"
            :isVisible="isOpenModalEditTask"
            title="Edit Task"
            :taskToEdit="taskToEdit"
            @close="closeModalEditTask"
            @edit-task="editTaskList"
        />
        <p class="text-gray-400 mb-4">
          A list of task
        </p>
        <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table class="table-auto w-full text-left">
            <thead class="bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-sm font-medium text-gray-300">ID</th>
                <th class="px-6 py-3 text-sm font-medium text-gray-300">Name</th>
                <th class="px-6 py-3 text-sm font-medium text-gray-300">Description</th>
                <th class="px-6 py-3 text-sm font-medium text-gray-300">Status</th>
                <th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="task in tasks"
                :key="task.id"
                class="border-b border-gray-700 hover:bg-gray-700"
              >
                <td class="px-6 py-4">{{ task.id }}</td>
                <td class="px-6 py-4">{{ task.name }}</td>
                <td class="px-6 py-4">{{ task.description }}</td>
                <td class="px-6 py-4">{{ task.status }}</td>
                <td class="px-6 py-4 text-right">
                  <a href="#" @click=editTask(task) class="text-green-400 hover:underline">Edit</a>
                  <a href="#" @click="deleteTask(task.id)" class="text-red-400 hover:underline pl-3">Del</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>

<script>
import { tasksService } from '../../services/tasks-service';
import CreateTaskManagementModal from './create-task-management.vue';
import UpdateTaskManagementModal from './update-task-management.vue';

export default {
    components: { CreateTaskManagementModal , UpdateTaskManagementModal},

  data() {
    return {
      tasks: [],
      isOpenModalAddTask: false,
      isOpenModalEditTask: false,
      taskToEdit: {},
    };
  },
  methods: {
    openModalAddTask() {
        this.isOpenModalAddTask = true;
    },
    closeModalAddTask() {
        this.isOpenModalAddTask = false;
    },

    openModalEditTask() {
        this.isOpenModalEditTask = true;
    },
    closeModalEditTask() {
        this.isOpenModalEditTask = false;
    },
    async fetchTasks() {
      try {
        this.tasks = await tasksService.fetchTasks();
      } catch (error) {
        console.error('There was an error!', error);
      }
    },

    updateTasks(newTask){
        this.tasks.push(newTask);
    },

    editTaskList(updatedTask) {
      console.log('หน้าหลัก');
      
      console.log(updatedTask);
      
    // หาข้อมูลใน tasks ที่มี id ตรงกับ task ที่ได้รับการอัปเดต
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      // ถ้าพบ task ที่ต้องการอัปเดต ให้เปลี่ยนค่าของมัน
      this.tasks[index] = updatedTask;
    }
  },

    // ลบ task
    async deleteTask(id) {
      try {
        await tasksService.deleteTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id); // ลบ task ที่มี ID ที่ตรงกัน
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },

    editTask(task) {
      this.taskToEdit = { ...task };
      this.openModalEditTask();
    },
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style>

</style>