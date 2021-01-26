import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { IUser } from '../_models';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<IUser>;
  public user: Observable<IUser>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    const userJson = localStorage.getItem('user');
    const currentUser =
      userJson !== null
        ? JSON.parse(userJson)
        : { id: '', name: '', email: '', role: '' };
    this.userSubject = new BehaviorSubject<IUser>(currentUser);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  login(email: string) {
    return this.userService.getUserByEmail(email).pipe(
      map(user => {
        console.log('%cUser', 'color: red; font-size: 20px;');
        console.log(user);
        const currUser =
          user || ({ id: '', name: '', email: '', role: '' } as IUser);
        localStorage.setItem('user', JSON.stringify(currUser));
        this.userSubject.next(currUser);
        if (user) return currUser;
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next({ id: '', name: '', email: '', role: '' });
    this.router.navigate(['/login']);
  }
}
