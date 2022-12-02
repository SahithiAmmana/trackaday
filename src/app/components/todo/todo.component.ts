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
    if(!this.authenticationService.isLoggedIn){
      this.toasterService.success(JSON.stringify(this.authenticationService.userID));
    }
    todo.isCompleted ? this.toasterService.success(`Todo succesfully completed`, JSON.stringify(this.authenticationService.userID)) : '';
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
      this.toasterService.success(JSON.stringify(this.authenticationService.userID));
      this.toasterService.error(`"${todo.title.substring(0, 20)}..." Archived!`, 'Archived Successfuly');
    } else{
      this.todoService.deleteTodo(todo);
      this.toasterService.error(`"${todo.title.substring(0, 20)}..." Deleted!`, 'Deleted Successfuly');
    }
  }
  isFavorite() {
    // this.todoInput.isFavorite = !this.todoInput.isFavorite;
    // if (this.todoInput.isFavorite) {

    //   this.toasterService.success('Todo Added to Favorite');

    //   this.todoService.fav.unshift(this.todoInput);

    //   localStorage.settodo("favorite", JSON.stringify(this.todoService.fav));

    // }
    // else {
    //   this.toasterService.error('Todo Removed from Favorite');
    //   let index = this.todoService.todoList.indexOf(this.todo);
    //   this.todoService.fav.splice(index, 1);

    //   localStorage.settodo("favorite", JSON.stringify(this.todoService.fav));

    // }
  }

}
