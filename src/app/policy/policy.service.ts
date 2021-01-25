import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IPolicy, IPolicies } from './policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private policiesUrl = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<IPolicies> {
    return this.http.get<IPolicies>(this.policiesUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
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
