import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {DataFromServerService} from '../../services/data-from-server.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {FavoriteAlbums} from '../FavoriteAlbums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  ganre:string;
  imgArray:string[]=[];
  albumsData;
  favoriteAlbumsArray:object[]=[];

  constructor(private activatedRoute: ActivatedRoute,
             private dataFromServerService: DataFromServerService,
             private localStorageService:LocalStorageService
            ) { }

  ngOnInit(): void {

    this.activatedRoute.params.forEach((params: Params) => {
     this.ganre = params.salectedGanre;
    })

    this.dataFromServerService.getImg(this.ganre).subscribe (data => {
      let position:number = 0;
      while (true) {
        let index:number = data.indexOf('extralarge', position);
        if (index == -1) {break;}
        this.imgArray.push(data.slice(index+12, index+94));
        position = index + 100;
      }
      
    });

    this.dataFromServerService.getAlbumsData(this.ganre).subscribe (data => {
      console.log(data);
      this.albumsData = data ['albums']['album'];
      console.log(this.albumsData);
    })
    

    
  }

  showModal (modal_album) {
    modal_album.style.display = 'block';
  }

  closeModal (modal_album) {
    modal_album.style.display = 'none';
  }

  makeLike(album:any, imgLink:string) {
    
    if (album.like) { album.like =false;
      this.favoriteAlbumsArray = this.favoriteAlbumsArray.filter (item => !(item['name'] == album.name));
      this.localStorageService.postData (this.ganre, this.favoriteAlbumsArray);
      console.log(this.favoriteAlbumsArray);
      
      
      return}


    album.like = true;
    console.log(album);
    
    this.favoriteAlbumsArray.push(new FavoriteAlbums (album.name, album.artist.name, imgLink, album.like));
    console.log(this.favoriteAlbumsArray);
    this.localStorageService.postData (this.ganre, this.favoriteAlbumsArray);
    
    
  }




    

}
