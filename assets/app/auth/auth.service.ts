import { FormGroup } from '@angular/forms';
import { ErrorService } from './../shared/errors/error.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { User } from './user.models';

@Injectable()
export class AuthService {

    constructor(private http: Http, private errorService: ErrorService) { }

    info() {
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.get('http://localhost:3000/api/user/profile' + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
        });
    }

    update(user: User) {
        const body = JSON.stringify(user);
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/api/user/' + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
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
        return this.http.patch('http://localhost:3000/api/user/password' + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
        });
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
        });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
        });
    }

    forgot(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/user/forgot', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
        });
    }

    reset(password: string, token: string) {
        const body = JSON.stringify({
            password: password,
            token: token
        });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/user/reset', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
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