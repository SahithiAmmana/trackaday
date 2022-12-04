import { Injectable, ApplicationRef } from '@angular/core';
import { Todo } from '../models/todo';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';
import { Observable, ReplaySubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  fav = [];
  todoList: Todo[] = [];
  appComponent: AppComponent;
  appRef: ApplicationRef;

  private todoReplay: ReplaySubject<Todo[]> = new ReplaySubject<Todo[]>(0);

  constructor(private deletePopup: ToastrService, appComponent: AppComponent, appRef: ApplicationRef) {
    this.appComponent = appComponent;
    this.appRef = appRef;
    this.readDataStore();
   }

   async readDataStore(){
    while(this.appComponent.isReading){
      await this.delay(10);
    }
    this.todoList = this.appComponent.appData.tasks;
    this.todoReplay.next(this.todoList);
    console.log("Updated appData: "+this.todoList[0]);
    this.appRef.tick();
   }

   waitForData():Observable<Todo[]>{
    return this.todoReplay;
   }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
   }

   deleteTodo(item:any) {
    let index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.save();
  }

  archiveTodo(item:any) {
    let index = this.todoList.indexOf(item);
    this.todoList[index].isArchived = true;
    this.save();
  }

  completed(item:Todo) {
    let index = this.todoList.indexOf(item);
    this.todoList[index].isCompleted = item.isCompleted;
    this.save();
  }

  addTodo(title:any) {
    let taskId = this.todoList.length + 2;

    const item: Todo = {
      taskId: taskId,
      isCompleted: false,
      isFavorite: false,
      isPinned: false,
      date: new Date(),
      title: title,
      isArchived: false
    }
    this.todoList.unshift(item);
    this.save();
  }

  save(){
    this.appComponent.saveTodoData(this.todoList);
  }

  updateFav(item: Todo){
    let index = this.todoList.indexOf(item);
    this.todoList[index].isFavorite = !this.todoList[index].isFavorite ;
    this.save();
  }

  updatePin(item: Todo){
    let index = this.todoList.indexOf(item);
    this.todoList[index].isPinned = !this.todoList[index].isPinned ;
    this.save();
  }
}
