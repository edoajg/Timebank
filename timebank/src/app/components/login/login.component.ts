import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'login',
  templateUrl: './login.Component.html',
  providers: [UserService]
})


export class LoginComponent implements OnInit{
  public title:string;
  public user:User;
  public status:string;
  public identity:any;
  public token:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.status = '';
    this.token = '';
    this.title = 'Identificate';
    this.user = new User(
      "",
      "",
      "",
      "",
      "",
      "",
      "ROLE_USER",
      ""    );
  };
  ngOnInit(){
    console.log('Componente de login cargado...');
    this.identity = this._userService.getIdentity();
  }
onSubmit(){
//logear al usuario y conseguir sus datos
  this._userService.signup(this.user, null).subscribe(
    response => {
      this.identity = response.user;
      console.log(this.identity);
      if(!this.identity || !this.identity._id){
        this.status = 'error';
      }else{
        this.status = 'success';
        //persistir datos del usuario
        localStorage.setItem('identity', JSON.stringify(this.identity));

        //conseguir token
        this.getToken();

        //redirigir a Home
        this._router.navigate(['/']);

      }
      console.log(response.user);
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
getToken(){
  this._userService.signup(this.user, 'true').subscribe(
    response => {
      this.token = response.token;
      console.log(this.token);
      if(this.token.length <= 0){
        this.status = 'error';
      }else{
        //persistir token del usuario
        localStorage.setItem('token', this.token);

        //conseguir los contadores del usuario
        this.getCounters();
      }
      this.status = 'success';
    },
    error => {
        var errorMessage = <any>error;
        if(errorMessage != null){
        this.status = 'error';
        }
    }
  )
}
getCounters(){
  this._userService.getCounters().subscribe(
    response => {
      localStorage.setItem('stats', JSON.stringify(response));
      this.status = 'success';
      console.log(response);
    },
    error => {
      console.log(<any>error);
    }
  )
}
}
