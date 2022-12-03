import { Session } from "./session";
import { Todo } from "./todo";

export class AppData{
    tasks: Todo[];
    session: Session[];

    constructor(){
        this.tasks = [];
        this.session = [];
    }
}