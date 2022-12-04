import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../models/todo';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  @Input() todoInput ={} as Todo;
  private authuid:String="";
  constructor(public todoService: TodoService, private toasterService: ToastrService, public authenticationService: AuthenticationService) { }
  
  ngOnInit(): void {
  }

  toggleClass() {
    if (this.todoInput.isCompleted) {
      return { 'list-group-todo-success': this.todoInput.isCompleted, 'border-primary': this.todoInput.isCompleted };
    }
    return null
  }

  redoTodo(todo: Todo) {
    console.log(todo)
    this.todoService.addTodo(todo.title)
    this.toasterService.success(`"${todo.title.substring(0, 20)}..." added to todo Successfully`);
  }

  deleteTodo(todo: Todo) {
    console.log(todo)
    this.todoService.deleteTodo(todo);
    this.toasterService.error(`"${todo.title.substring(0, 20)}..." Deleted!`, 'Deleted Successfuly');
  }

  isFavorite(todo: Todo) {
    this.todoService.updateFav(todo);
    if (this.todoInput.isFavorite) {
      this.toasterService.success(`"${todo.title.substring(0, 20)}..." Added to Favorite`);
    }
    else {
      this.toasterService.success(`"${todo.title.substring(0, 20)}..." Removed from Favorite`);
    }
  }

}
