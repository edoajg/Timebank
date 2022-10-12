import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Follow } from '../models/follow';

@Injectable()

export class FollowwService{
    public url: string;
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    addFollow(token:string, follow:any):Observable<any>{
      let params = JSON.stringify(follow);
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);

      return this._http.post(this.url+'follow', params, {headers: headers});

    }
    deleteFollow(token:string, id:string):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Authorization', token);

      return this._http.delete(this.url+'follow/'+id, {headers: headers});
    }
}
