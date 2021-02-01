import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataFromServerService {
 
 constructor(private http: HttpClient) { }
 
  getImg(ganre:string) {
    let URL:string = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" + ganre + "&api_key=b0414dc9024f62cd2a4524179e9b1b15&limit=15";
    return this.http.get(URL, {responseType: 'text'})
    .pipe (
      retry(2),
      catchError(this.handleError) 
    )
  }

  getAlbumsData(ganre:string) {
    let URL:string = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" + ganre + "&api_key=b0414dc9024f62cd2a4524179e9b1b15&format=json&limit=15";
    return this.http.get(URL)
    .pipe (
      retry(2),
      catchError(this.handleError) 
    );
  }

  handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred.', error.error.message);
      
    } else {
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    return throwError(
      'Something bad happened; please try again later.');
  }

}
