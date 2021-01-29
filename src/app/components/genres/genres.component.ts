import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToAlbums(ganre:string) {
    this.router.navigate(["albums", {salectedGanre: ganre}]);
  }

}
