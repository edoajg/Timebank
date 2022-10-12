import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Follow } from '../models/follow';

@Injectable({ providedIn: 'root' })
export class FollowwService{
    // public evento = new EventEmitter<string>();
    // public subject = new Subject<any>();
    // sendClickEvent(){
    //  this.subject.next();
    //  console.log(this.subject.asObservable());

    // };
    // getClickEvent():Observable<any>{
    //  console.log('asasassas');
    //  return this.subject.asObservable();
    // };
    public url: string;
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    addFollow(token:string, follow:any):Observable<any>{
      let params = JSON.stringify(follow);
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);
      let stats = JSON.parse(localStorage.getItem('stats') || '{}');
      stats.following = stats.following + 1
      localStorage.setItem("stats",JSON.stringify(stats));


      return this._http.post(this.url+'follow', params, {headers: headers});


    }
    deleteFollow(token:string, id:string):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);
      let stats = JSON.parse(localStorage.getItem('stats') || '{}');
      stats.following = stats.following - 1
      localStorage.setItem("stats",JSON.stringify(stats));
      return this._http.delete(this.url+'follow/'+id, {headers: headers});
    }
}
