import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-header',
    /*template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenger</a></li>    
                    <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>  
                </ul>
            </nav>
        </header>  
    `*/
    templateUrl: '/header.component.html'
})
export class HeaderComponent {

    constructor(private authService: AuthService) { }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}