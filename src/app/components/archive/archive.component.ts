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

}
