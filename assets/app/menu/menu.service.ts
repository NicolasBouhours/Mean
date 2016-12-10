import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MenuService {
    menuEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
}