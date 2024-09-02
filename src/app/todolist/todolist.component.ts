import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todos: { id: number; task: string; completed: boolean }[] = [];
  editingIndex: number | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getTodoList();
  }

  removeTask(index: number) {
    this.todoService.removeTask(index);
    this.todos = this.todoService.getTodoList();
  }

  editTaskDesc(index: number) {
    this.editingIndex = index;
  }

  markTaskCompletion(index: number) {
    this.todoService.toggleTaskCompletion(index);
    this.todos = this.todoService.getTodoList();
  }
}
