import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../Models/to-do';
import { ToDoService } from '../../Services/to-do.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent implements OnInit {
  todo: ToDo[] = [];
  newTodo: ToDo ={} as ToDo;
  constructor(private todoService : ToDoService) {}

  ngOnInit(): void {
    this.getToDoList();
  }
  getToDoList(){
    this.todoService.getToDoList().subscribe((data) => {
      this.todo = data;
    })
  }

  createToDo() : void{
    let newTodo = {id:this.newTodo.id, title: this.newTodo.title, completed: false};
    this.newTodo = newTodo
    this.todoService.createToDo(newTodo).subscribe((data) => {
      this.todo.push(data);
      this.getToDoList();
      this.newTodo.title = "";
    })
  }

  deleteTodo(id: any): void{
    this.todoService.deleteTodo(id).subscribe(() => {
      this.getToDoList();
    })
  }
}
