import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IUser, IClients } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://www.mocky.io/v2/5808862710000087232b75ac';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IClients> {
    return this.http.get<IClients>(this.usersUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUser(id: string): Observable<IUser | undefined> {
    return this.getUsers().pipe(
      map((clients: IClients) => clients.clients.find(user => user.id === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
