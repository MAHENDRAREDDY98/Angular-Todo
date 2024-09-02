import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent implements OnChanges {
  @Input() editingIndex: number | null = null;
  taskInput = '';

  constructor(private todoService: TodoService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingIndex'] && this.editingIndex !== null) {
        const todoList = this.todoService.getTodoList();
        if (this.editingIndex >= 0 && this.editingIndex < todoList.length) {
          this.taskInput = todoList[this.editingIndex].task;
        }
      } 
    }

  onSubmit() {
    if (this.editingIndex !== null) {
      this.todoService.editTaskDesc(this.editingIndex, this.taskInput);
      this.editingIndex = null;
    } else {
      this.todoService.addTask(this.taskInput);
    }
    this.taskInput = '';
  }

  onReset() {
    this.taskInput = '';
    this.editingIndex = null;
  }
}
