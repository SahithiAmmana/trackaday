import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../models/todo';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  // @Input() todoInput;
  @Input() todoInput ={} as Todo;
  private authuid:String="";
  constructor(public todoService: TodoService, private toasterService: ToastrService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {

  }

  onChange(todo: Todo) {
    console.log("changed: "+JSON.stringify(todo));
    todo.isCompleted = !todo.isCompleted;
    this.todoService.completed(todo);
    todo.isCompleted ? this.toasterService.success(`Todo succesfully completed`, 'TODO') : '';
  }

  onCliCk(e: any) {
    console.log("Clicked");
    console.log(e);
  }

  toggleClass() {
    if (this.todoInput.isCompleted) {
      return { 'list-group-todo-success': this.todoInput.isCompleted, 'border-primary': this.todoInput.isCompleted };
    }
    return null
  }

  deleteTodo(todo: Todo) {
    console.log(todo)

    if (todo.isCompleted){
      this.todoService.archiveTodo(todo);
      this.toasterService.error(`"${todo.title.substring(0, 20)}..." Archived!`, 'Archived Successfuly');
    } else{
      this.todoService.deleteTodo(todo);
      this.toasterService.error(`"${todo.title.substring(0, 20)}..." Deleted!`, 'Deleted Successfuly');
    }
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

  togglePin(todo: Todo) {
    this.todoService.updatePin(todo);
    if (this.todoInput.isPinned) {
      this.toasterService.success(`"${todo.title.substring(0, 20)}..." is pinned`);
    }
    else {
      this.toasterService.success(`"${todo.title.substring(0, 20)}..." is Unpinned`);
    }
  }

}
