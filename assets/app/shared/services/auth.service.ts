import { ApiService } from './api.service';
import { User } from './../models/user.models';
import { AppSettings } from './../../app.settings';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: Http,
        private apiService: ApiService) { }

    info() {
        return this.apiService.get('user/profile');
    }

    update(user: User) {
        return this.apiService.patch('user', user);
    }

    updatePassword(password: string, newPassword: string, newConfirmPassword: string) {
        const body = {
            password: password,
            newPassword: newPassword,
            newConfirmPassword: newConfirmPassword
        }
        return this.apiService.patch('user/password', body);
    }

    signup(user: User) {
        return this.apiService.post('user', user);
    }

    signin(user: User) {
        return this.apiService.post('user/signin', user);
    }

    forgot(user: User) {
        return this.apiService.post('user/forgot', user);
    }

    reset(password: string, token: string) {
        const body = {
            password: password,
            token: token
        };
        return this.apiService.post('user/reset', body);
    }

    logout() {
        localStorage.clear();
    }

    logUser(userId: string) {
        localStorage.setItem('userId', userId); 
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    confirmPasswordValidator(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup) => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
        
            if ((confirmPassword.value != undefined && confirmPassword.value.length > 0) && password.value !== confirmPassword.value) {
                return {
                mismatchedPasswords: true
                };
            }
        }
    }
}