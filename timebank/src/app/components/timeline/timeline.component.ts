import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';

import { UserService } from '../../services/user.service';
import { PublicationService} from '../../services/publication.service'
// import { UploadService} from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  providers: [UserService, PublicationService ]
})
export class TimelineComponent implements OnInit{
  public identity: string;
  public token: string;
  public title: string;
  public url: string;
  public status: string;
  public page : number;
  public total: number;
  public pages: number;
  public publications: Publication[];
  public itemsPerPage: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService

  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.title = 'Timeline';
    this.url = GLOBAL.url;
    this.page = 1;
    this.status = '';
    this.publications = [];
    this.total = 1;
    this.pages = 1;
    this.itemsPerPage = 0

  }

  ngOnInit(){
    console.log('timeline component cargado');
    this.getPublications(this.page);


  }
  getPublications(page:number, adding = false){
    this._publicationService.getPublications(this.token, this.page).subscribe(
      response => {
        if(response.publications){
          this.total = response.total_items;
          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;
          if(!adding){
            this.publications = response.publications;
          }else{
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);
            $("html, body").animate({ scrollTop: $('body').prop("scrollHeight")}, 500)
          }

          if(page > this.pages){
        //    this._router.navigate(['/home']);
          }

        }else{
          this.status = 'error';
        }
      },
      error => {

      }

    )
  }
  public noMore = false;
  viewMore(){
    console.log(this.publications.length);
    console.log(this.total-this.itemsPerPage);
    if(this.publications.length == this.total){
      this.noMore = true;
    }else{
      this.page +=1;
    }
    this.getPublications(this.page, true);
  }

}
