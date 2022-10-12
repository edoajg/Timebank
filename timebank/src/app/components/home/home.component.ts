import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';


@Component ({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [UserService]
})

export class HomeComponent implements OnInit{
  public title:string;
  public identity:any;

  constructor(
    private _userService: UserService
  ){
    this.title = 'Timebank';
  }
  ngOnInit(){
    this.identity = this._userService.getIdentity();
    if(!this.identity.name){
    this.identity.name = 'invitado';
    }

  }
}
