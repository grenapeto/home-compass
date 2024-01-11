import { Component } from '@angular/core';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    constructor(private accountService: AccountService) { }

    get account() {
        return this.accountService.accountValue;
    }
}
