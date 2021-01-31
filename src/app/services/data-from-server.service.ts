import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataFromServerService {
 
 constructor(private http: HttpClient) { }
 

  getImg(ganre:string) {
    let URL:string = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" + ganre + "&api_key=b0414dc9024f62cd2a4524179e9b1b15&limit=15";
    return this.http.get(URL, {responseType: 'text'});
  }

  getAlbumsData(ganre:string) {
    let URL:string = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" + ganre + "&api_key=b0414dc9024f62cd2a4524179e9b1b15&format=json&limit=15";
    return this.http.get(URL);
  }
}
