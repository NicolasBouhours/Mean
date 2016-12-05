import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from './../errors/error.service';
import { NotificationService } from './../notification/notification.service';
import { AuthService } from './auth.service';
import { User } from './user.models';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    constructor(private authService: AuthService, 
                private errorService: ErrorService, 
                private notificationService: NotificationService,
                private router: Router) {}

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
            ]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl(null, Validators.required),
        }, this.authService.confirmPasswordValidator('password', 'confirmPassword'));
    }

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName, 
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                (data) => {
                    this.notificationService.handleNotification(data.message, true);
                    this.router.navigate(['/auth', 'signin']);
                },
                (error) => {
                   this.errorService.handleError(error);
                }
            );
        this.myForm.reset();
    }
}