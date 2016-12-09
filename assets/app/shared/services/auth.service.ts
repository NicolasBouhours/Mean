import { User } from './../models/user.models';
import { AppSettings } from './../../app.settings';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    info() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get(`${AppSettings.API_ENDPOINT}user/profile${token}`)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    update(user: User) {
        const body = JSON.stringify(user);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(`${AppSettings.API_ENDPOINT}user${token}`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    updatePassword(password: string, newPassword: string, newConfirmPassword: string) {
        const body = JSON.stringify({
            password: password,
            newPassword: newPassword,
            newConfirmPassword: newConfirmPassword
        });
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(`${AppSettings.API_ENDPOINT}user/password${token}`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        console.log(`${AppSettings.API_ENDPOINT}user`);
        return this.http.post(`${AppSettings.API_ENDPOINT}user`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${AppSettings.API_ENDPOINT}user/signin`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    forgot(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${AppSettings.API_ENDPOINT}user/forgot`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    reset(password: string, token: string) {
        const body = JSON.stringify({
            password: password,
            token: token
        });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(`${AppSettings.API_ENDPOINT}user/reset`, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
        });
    }

    logout() {
        localStorage.clear();
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