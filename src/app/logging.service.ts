import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoggingService {

    lastlog: string;

    printLog(message: string) {
        console.log(`Message: ${message}`);
        console.log(`Last Log: ${this.lastlog}`);
        this.lastlog = message;
    }
}