
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { User } from './../user.models';
import { AuthService } from '../auth.service';
import { NotificationService } from './../../shared/notification/notification.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    myForm: FormGroup;
    token: string;

    constructor(private authService: AuthService, 
        private router : Router, 
        private route: ActivatedRoute,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.myForm = new FormGroup({
            newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            newConfirmPassword: new FormControl(null, Validators.required)
        }, this.authService.confirmPasswordValidator('newPassword', 'newConfirmPassword'));

        this.subscription = this.route.queryParams.subscribe(
            (queryParam: any) => this.token = queryParam['token']
        );
    }

    onSubmit() {
        const user = new User('', this.myForm.value.password);
        this.authService.reset(this.myForm.value.newPassword, this.token)
            .subscribe(
                data => {
                    this.notificationService.handleNotification(data.message, 'primary');
                    this.router.navigate(['/auth', 'signin']);
                },
                error => this.notificationService.handleNotification(error.title, 'danger')
        );

        this.myForm.reset();
    } 

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}