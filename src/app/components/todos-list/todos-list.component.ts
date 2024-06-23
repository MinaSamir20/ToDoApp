import { Component, HostListener, OnInit } from '@angular/core';
import { ToDo } from '../../Models/to-do';
import { ToDoService } from '../../Services/to-do.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent implements OnInit {
  todo: ToDo[] = [];
  newTodo: ToDo = {} as ToDo;
  title: string ='';
  noFound: string = '';

  private apiUrl = 'http://localhost:3000/todos';

  constructor(private todoService: ToDoService) {}

  ngOnInit(): void {
    this.todo = this.todoService.getLocalData();
    if (navigator.onLine) {
      this.syncData();
    }
  }


  getToDoList() {
    this.todoService.getToDoList().subscribe((data) => {
      this.todo = data;
    });
  }

  createToDo(): void {
    let newTodo = {
      id: this.newTodo.id,
      title: this.newTodo.title,
      completed: false,
    };
    this.newTodo = newTodo;
    if (window.navigator.onLine) {
      this.todoService.createToDo(newTodo).subscribe((data) => {
        this.todo.push(data);
        this.getToDoList();
        this.newTodo.title = '';
      });
    } else {
      this.noFound = 'No Internet Connection';
    }
  }

  deleteTodo(id: any): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.getToDoList();
    });
  }


  @HostListener('window:offline', ['$event'])
  onOffline(event: Event) {
    console.log('Went offline');
  }

  @HostListener('window:online', ['$event'])
  onOnline(event: Event) {
    console.log('Back online');
    this.syncData();
  }

  saveDataLocally(): void {
    let formData = {
      id: Date.now(),
      title: this.title,
      completed: false,
    };
    this.todo.push(formData)
    this.todoService.saveDataLocally(formData);
    this.title = ''; // Reset form data after saving
  }

  async syncData(): Promise<void> {
    await this.todoService.syncData(this.apiUrl);
    this.todo = this.todoService.getLocalData();
  }
}
