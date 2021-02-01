import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {DataFromServerService} from '../../services/data-from-server.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {FavoriteAlbums} from '../FavoriteAlbums';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  ganre:string;
  imgArray:string[]=[];
  copyImgArray:string[]=[];;
  albumsData:any;
  copyAlbumsData:any;
  favoriteAlbumsArray:object[]=[];
  copyFavoriteAlbumsArray:object[]=[];
  tempFavoriteAlbumsArray:object[]=[];
  likesCounter:number = 0;
  flag:boolean = true;
    
  constructor(private activatedRoute: ActivatedRoute,
             private dataFromServerService: DataFromServerService,
             private localStorageService:LocalStorageService
            ) { }

  ngOnInit(): void {

    this.activatedRoute.params.forEach((params: Params) => {
      this.ganre = params.salectedGanre;
    });

    this.favoriteAlbumsArray = this.localStorageService.getData(this.ganre);
    this.tempFavoriteAlbumsArray = this.localStorageService.getData(this.ganre);
    this.likesCounter = this.tempFavoriteAlbumsArray.length;  

    this.dataFromServerService.getImg(this.ganre).subscribe (data => {
      let position:number = 0;
      while (true) {
        let index:number = data.indexOf('extralarge', position);
        if (index == -1) {break;}
        this.imgArray.push(data.slice(index+12, index+94));
        position = index + 100;
      }
      
      if (this.favoriteAlbumsArray[0]) {
        this.imgArray = this.imgArray.filter(imgItem => {
          for (let i=0; i<this.favoriteAlbumsArray.length; i++) {
            if (imgItem == this.favoriteAlbumsArray[i]['imgLink']) {return false}
          } 
          return true
        })
      }
    }, (err: HttpErrorResponse) => {alert (err)});

    this.dataFromServerService.getAlbumsData(this.ganre).subscribe (data => {
      this.albumsData = data ['albums']['album'];
      if (this.favoriteAlbumsArray[0]) {
        this.albumsData = this.albumsData.filter(albumsDataItem => {
          for (let i=0; i<this.favoriteAlbumsArray.length; i++) {
            if (albumsDataItem.name == this.favoriteAlbumsArray[i]['name']) {return false}
          } 
          return true
        })
      }
     
    }, (err: HttpErrorResponse) => {alert (err)})
       
  }

  showModal (modal_album:any) {
    modal_album.style.display = 'block';
  }

  closeModal (modal_album:any) {
    modal_album.style.display = 'none';
  }

  makeLike(album:any, imgLink:string) {
    
    if (album.like) {
      album.like =false;
      this.likesCounter--;
      this.tempFavoriteAlbumsArray = this.tempFavoriteAlbumsArray.filter (item => !(item['name'] == album.name));
      this.localStorageService.postData (this.ganre, this.tempFavoriteAlbumsArray);
      return}

    album.like = true;
    this.likesCounter++;
        
    this.tempFavoriteAlbumsArray.push(new FavoriteAlbums (album.name, album.artist.name, imgLink, album.like));
    this.localStorageService.postData (this.ganre, this.tempFavoriteAlbumsArray);
   
  }
  
  serch (searchText:string) {
        
      if (searchText.length == 0) {
        this.loadCopyData ();
        this.loadCopyFavoriteAlbumsArray ();
        this.flag = true;
        return;
      }
    
      if (this.flag) {
        this.makeCopyData ();
        this.flag = false
      }
      
      this.loadCopyData();
      
      for (let i=0; i<this.albumsData.length; i++) {
        if ( !(this.albumsData[i].name.toLowerCase().includes(searchText.toLowerCase())) ) {
          this.imgArray.splice(i,1);
          this.albumsData.splice(i,1);
          i--;
        }
      }

      this.loadCopyFavoriteAlbumsArray ();
      if (this.favoriteAlbumsArray[0]) {        
        this.favoriteAlbumsArray = this.favoriteAlbumsArray.filter(item => item['name'].toLowerCase().includes(searchText.toLowerCase()));
      }
  }

  makeCopyData () {
    this.copyAlbumsData = JSON.parse(JSON.stringify(this.albumsData));
    this.copyImgArray = JSON.parse(JSON.stringify(this.imgArray));
    this.copyFavoriteAlbumsArray = JSON.parse(JSON.stringify(this.favoriteAlbumsArray));
  }

  loadCopyData () {
      this.albumsData = JSON.parse(JSON.stringify(this.copyAlbumsData));
      this.imgArray = JSON.parse(JSON.stringify(this.copyImgArray));
  }

  loadCopyFavoriteAlbumsArray (){
    this.favoriteAlbumsArray = JSON.parse(JSON.stringify(this.copyFavoriteAlbumsArray));
  }

  
}

