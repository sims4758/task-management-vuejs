import axios from "axios";

const apiUrl = 'http://localhost:4000/tasks';

export const tasksService = {
    
    async fetchTasks() {
      try {
        const response = await axios.get(apiUrl);
        return response.data;
      } catch (error) {
        console.error('There was an error fetching tasks:', error);
        throw error;
      }
    },
  
    async addTask(task) {
      try {
        const response = await axios.post(apiUrl, task);
        return response.data;
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },

    async updateTask(task) {
        try {
            const response = await axios.put(`${apiUrl}/${task.id}`, task)
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
        throw error;
        }
    },
  
    async deleteTask(id) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        return id;
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    }
  };