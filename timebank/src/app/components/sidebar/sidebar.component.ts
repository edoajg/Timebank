import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

// import { FollowwService } from '../../services/followw.service';
import { GLOBAL } from '../../services/global';
// import { Observable, Subscription } from 'rxjs';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService, PublicationService,UploadService]
})
export class SidebarComponent implements OnInit{
  public identity: any;
  public token: string;
  public stats: any;
  public url: any;
  public publication: Publication;
  public status: string;
  public filesToUpload: Array<File>;
  //Tratando de pasar el click entre componentes
  // public clickEventSubscription: Subscription;
  //@Input() item: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _uploadService: UploadService
    // private _followService: FollowwService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.status= '';
    this.filesToUpload= [];
    this.publication= new Publication("","","","",this.identity._id);

    this.url = GLOBAL.url;
    //this.clickEventSubscription = this._followService.getClickEvent().subscribe(() =>{
    //  this.updateFollows();

    // });

  }
  ngOnInit(){
    console.log('sidebar.component ha sido cargado');
    // this._followService.evento.subscribe( n => {
    //   console.log(n);
    //   this.updateFollows();
    // });
  }
  // updateFollows(){
  //   let stats2 = JSON.parse(localStorage.getItem('stats') || '{}');
  //   this.stats.following = stats2.following;
  // };
  onSubmit(form:any){
    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if(response.publication){
          //this.publication = response.publication;


          this._uploadService.makeFileRequest(this.url+"upload-image-pub/"+response.publication._id, [], this.filesToUpload, this.token, 'file')
                              .then((result: any) =>{
                                this.publication.file = result.image;

                                this.status = 'success';
                                form.reset();
                                this._router.navigate(['/timeline']);
                              });
        }else{
          this.status = 'error22';
        }
      },
      error => {
        var errorMessage  = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status = 'errorss';
        }
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
