import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { ErrorService } from './error.service';
import {Observable} from 'rxjs/Rx';
import { Error } from './error.model';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    animations: [
        trigger('notification', [
          state('hidden', style({
            transform: 'translateX(200px)',
            opacity: 0,
            display: 'hidden'
          })),
          state('show', style({
            transform: 'translateX(0px)',
            opacity: 1,
            display: 'block'
          })),
          transition('hidden <=> show', animate(300)),
        ]),
    ]
})
export class ErrorComponent implements OnInit {
    error: Error;
    state = 'hidden';

    constructor(private errorService: ErrorService) { }

    ngOnInit() {
        this.errorService.errorOccurend
            .subscribe(
            (error: Error) => {
                this.error = error;
                //this.display = 'block';
                this.state = 'show';

                let timer = Observable.timer(8000);
                timer.subscribe(t=> {
                    this.state = 'hidden';
                });
            }
        );

    }

    onErrorHandled() {
        this.state = 'hidden';
    }
}