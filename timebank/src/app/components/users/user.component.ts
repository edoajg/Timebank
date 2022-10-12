import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowwService } from '../../services/followw.service';
import { GLOBAL } from '../../services/global';

@Component ({
  selector: 'users',
  templateUrl: './user.component.html',
  providers: [UserService, FollowwService],
})
export class UsersComponent implements OnInit{
  public title: string;
  public url: string;
  public identity: any;
  public token: string;
  public page: any;
  public next_page: any;
  public prev_page: any;
  public status: string;
  public total: any;
  public follows: any;
  public pages: any;
  public users: User[];
  public stats: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowwService
  ){
    this.title = 'Gente';
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.status= '';
    this.users = [];
    this.stats = this._userService.getStats();
  }
  ngOnInit(){
    console.log('users.component ha sido cargado')
    this.actualPage();
  }
  actualPage(){
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if(!page){
        page = 1;
        this.next_page = page+1;
      }
      else{
        this.next_page = page+1;
        this.prev_page = page-1;
        if(this.prev_page <= 0){this.prev_page = 1;}}
        this.getUsers(page);
    });
  }
  getUsers(page:any){
    // if(!this.identity.name){ this._router.navigate(['/']); };
    this._userService.getUsers(page).subscribe(
      response => {
        if(!response.users){ this.status = 'error'; }
        else{

           this.total = response.total;
           this.users = response.users;
           this.pages = response.pages;
           this.follows = response.users_following;

           console.log(this.follows);

          if(page > this.pages){
            this._router.navigate(['/gente', 1]);
          }
          console.log(response)}
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }
  public followUserOver:any;
  mouseEnter(user_id:string){
    this.followUserOver = user_id;
  }
  mouseLeave(user_id:string){
    this.followUserOver = 0;
  }
  followUser(followed:any){
  //  this._followService.evento.emit('olax');
    // this._followService.sendClickEvent();
    var follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
        if(!response.follow){
          this.status = 'error';
        }else{
          this.status = 'success';
          this.follows.push(followed);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    )
  }
  unfollowUser(followed:any){
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
        var search = this.follows.indexOf(followed);
        if(search != -1){
          this.follows.splice(search, 1);

        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'error';
      }
    }
    )
  }

}
