export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

export class ToDo {
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string, completed: boolean) {
    this.id = id;
    this.title = title;
    this.completed = completed;
  }
}
