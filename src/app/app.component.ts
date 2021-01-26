import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from './_services';
import { IUser } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent implements OnInit {
  user: IUser = { id: '', name: '', email: '', role: '' };
  faSignOut = faSignOutAlt

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.user.subscribe(x => (this.user = x));
  }

  logout() {
    this.authenticationService.logout();
  }
}
