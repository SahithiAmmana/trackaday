import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {

  todoList: Todo[] = [];
  @Input() todoInput ={} as Todo;
  constructor(public todoService: TodoService, public route: ActivatedRoute) { }

  viewList: boolean = true;
  ngOnInit(): void {
    this.route.url.subscribe(data => {
      if (data[0].path == 'archive') {
        this.viewList = true;
      }
      else {
        this.viewList = false;
        //this.todoService.updateFav();
        console.log()
      }
    })

    this.todoService.waitForData().subscribe((todoList: Todo[])=>{
      this.todoList = todoList;
    });
  }
  toggleClass() {
    if (this.todoInput.isCompleted) {
      return { 'list-group-todo-success': this.todoInput.isCompleted, 'border-primary': this.todoInput.isCompleted };
    }
    return null
  }

}
