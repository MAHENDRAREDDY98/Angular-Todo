import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'todoList'; // Key to store data in local storage

  private todoList: { id: number; task: string; completed: boolean }[] = []; // Initialize as an empty array

  constructor() {
    this.loadTasks(); // Load tasks from local storage on service instantiation
  }

  // Loads the todo list from local storage or initializes it as an empty array if not found
  private loadTasks() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.todoList = JSON.parse(storedData);
    } else {
      this.todoList = []; // Initialize with an empty array if nothing is stored
    }
  }

  // Saves the current todo list to local storage
  private saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoList));
  }

  // Adds a new task to the todo list
  addTask(taskName: string) {
    const newId = this.todoList.length > 0 ? Math.max(...this.todoList.map(task => task.id)) + 1 : 1;
    this.todoList.push({ id: newId, task: taskName, completed: false });
    this.saveTasks(); // Save changes to local storage
  }

  // Removes a task from the todo list by index
  removeTask(index: number) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList.splice(index, 1);
      this.saveTasks(); // Save changes to local storage
    } else {
      console.error('Index out of bounds');
    }
  }

  // Edits a task's description and resets its completion status
  editTaskDesc(index: number, updatedTask: string) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList[index].task = updatedTask;
      this.todoList[index].completed = false; // Reset completion status
      this.saveTasks(); // Save changes to local storage
    } else {
      console.error('Index out of bounds');
    }
  }

  // Toggles the completion status of a task
  toggleTaskCompletion(index: number) {
      this.todoList[index].completed = true;
      this.saveTasks(); // Save changes to local storage
  }

  // Expose the todo list for other components to use
  getTodoList() {
    return this.todoList;
  }
}
