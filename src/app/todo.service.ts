import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'todoList';

  private todoList: { id: number; task: string; completed: boolean }[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.todoList = JSON.parse(storedData);
    } else {
      this.todoList = [];
    }
  }

  private saveTasks() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todoList));
  }

  addTask(taskName: string) {
    const newId = this.todoList.length > 0 ? Math.max(...this.todoList.map(task => task.id)) + 1 : 1;
    this.todoList.push({ id: newId, task: taskName, completed: false });
    this.saveTasks();
  }

  removeTask(index: number) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList.splice(index, 1);
      this.saveTasks();
    } else {
      console.error('Index out of bounds');
    }
  }

  editTaskDesc(index: number, updatedTask: string) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList[index].task = updatedTask;
      this.todoList[index].completed = false;
      this.saveTasks();
    } else {
      console.error('Index out of bounds');
    }
  }

  toggleTaskCompletion(index: number) {
      this.todoList[index].completed = true;
      this.saveTasks();
  }

  getTodoList() {
    return this.todoList;
  }
}
