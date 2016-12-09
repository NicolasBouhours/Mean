import { JwtService } from './../../shared/services/jwt.service';
import { User } from './../../shared/models/user.models';
import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from './../../shared/notification/notification.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    myForm: FormGroup;

    constructor(private authService: AuthService, 
                private router : Router,
                private notificationService: NotificationService,
                private jwtService :JwtService) { }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    this.jwtService.saveToken(data.token);
                    this.authService.logUser(data.userId);
                    this.myForm.reset();
                    this.router.navigateByUrl('/');
                },
                error => this.notificationService.handleNotification(error.title, 'danger')
        );

    } 
}