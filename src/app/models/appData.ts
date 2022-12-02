import { Session } from "./session";
import { Todo } from "./todo";
import { UserDetails } from "./userDetails";

export class AppData{
    tasks: Todo[];
    session: Session[];
    userdets: UserDetails[];

    constructor(){
        this.tasks = [];
        this.session = [];
        this.userdets = [];
    }
}