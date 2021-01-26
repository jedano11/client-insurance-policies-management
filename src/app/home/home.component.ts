import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { faDove, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { IUser } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'home.component.html', styleUrls: ['./home.component.css']})
export class HomeComponent {
    loading = false;
    users: IUser[];
    faDove = faDove;
    faArrowRight = faArrowRight;

    constructor(private userService: UserService) {
        this.users = [];
    }

    ngOnInit() {
        this.loading = true;
    }
}