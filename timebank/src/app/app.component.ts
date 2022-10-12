import { Component, OnInit, DoCheck } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './services/user.service';
import { FollowwService } from './services/followw.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from './services/global';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, FollowwService]
})
export class AppComponent implements OnInit, DoCheck{
  public title:string;
  public identity:any;
  public url:string;
  public faHome = faHome;
  public faList = faList;
  public faUsers = faUsers;

  constructor(
   private _userService: UserService,
   private _router: Router,
   private _route: ActivatedRoute

  ){
    this.title = 'Timebank';
    this.url = GLOBAL.url;
  }
   ngOnInit(){
     this.identity = this._userService.getIdentity();
//     if(!this.identity.name){   this._router.navigate(['/login']); }
   }
   ngDoCheck(){
     this.identity = this._userService.getIdentity();
   }
   logout(){
     localStorage.clear();
     this.identity = null;
     if(window.location.pathname === "/" || window.location.pathname === "/home" ){
       window.location.reload();
     }else{
      this._router.navigate(['/']);
   }
}
}
