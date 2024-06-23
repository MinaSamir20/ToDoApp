import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDo } from '../../Models/to-do';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoService } from '../../Services/to-do.service';

@Component({
  selector: 'app-todos-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todos-details.component.html',
  styleUrl: './todos-details.component.scss',
})
export class TodosDetailsComponent implements OnInit {
  todo: ToDo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: ToDoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getTodo();
  }
  getTodo() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.todoService.getTodoById(id).subscribe((data) => {
      this.todo = data;
    });
  }
  updateToDo(): void {
    if (this.todo) {
      this.todoService
        .updateTodo(this.todo)
        .subscribe(() => this.router.navigate(['/todo']));
    }
  }
}
