import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  ngOnInit(): void {
    if(window.navigator.onLine){
      
    }
  }
  title: string = 'ToDo Appllication';
  img: string = 'http://cdn-icons-png.flaticon.com/512/4697/4697260.png';

  tasks: string[] = [];
  newtask: string = '';
  isNotNull: boolean = false;

  addTask() {
    if (this.newtask.trim() !== '') {
      this.tasks.push(this.newtask);
      this.newtask = '';
      this.isNotNull = true;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.tasks.length === 0) this.isNotNull = false;
  }
  // editTask(index: number) {
  //   let updateTask = prompt('Edit this task', this.tasks[index]);
  //   if (updateTask !== null) this.tasks[index] = updateTask.trim();
  // }
  editTask(index: number, editTask: string) : string | void {
    const trimedTask = editTask.trim();
    if (trimedTask !== '') {
      this.tasks[index] = editTask;
    } else {
      editTask = this.tasks[index];
      return this.newtask = editTask;
    }
    this.newtask = '';
  }
}
