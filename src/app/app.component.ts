import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './_services';
import { IUser } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  user: IUser = { id: '', name: '', email: '', role: '' };

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.user.subscribe(x => (this.user = x));
  }

  logout() {
    this.authenticationService.logout();
  }
}
