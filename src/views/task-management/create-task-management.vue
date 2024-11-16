<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
    >
      <div class="bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
        <slot></slot>
        <div class="mb-4">
        <label for="taskName" class="block text-sm font-medium text-white">Task Name</label>
        <input
          type="text"
          id="taskName"
          v-model="taskName"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task name"
        />
      </div>
      <div class="mb-4">
        <label for="taskDetails" class="block text-sm font-medium text-white">Task Details</label>
        <textarea
          id="taskDetails"
          v-model="taskDescription"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter task details"
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="taskStatus" class="block text-sm font-medium text-white">Task Status</label>
        <select
          id="taskStatus"
          v-model="taskStatus"
          class="mt-1 block w-full p-2  border border-gray-300 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
        <div class="flex justify-end mt-4">
            <button
            l
            type="button"
            @click=saveTask
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 mr-2"
          >
            Save
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { tasksService } from '../../services/tasks-service';

  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Modal Title",
      },
    },

    data() {
        return {
            taskName: '',
            taskDescription: '',
            taskStatus: 'pending'
        };
    },

    methods: {
        async saveTask() {
            try {
                const taskData = {
                name: this.taskName,
                description: this.taskDescription,
                status: this.taskStatus
            }
            const responseSaveTask = await tasksService.addTask(taskData);
            this.$emit('update-task', responseSaveTask)
            this.$emit('close');
            } catch (e){
                console.error('Error Save Task', error);
                
            }
        }
    }
  };
  </script>
  