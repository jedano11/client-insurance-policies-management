import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { IUser } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: IUser[];

    constructor(private userService: UserService) {
        this.users = [];
    }

    ngOnInit() {
        this.loading = true;
    }
}