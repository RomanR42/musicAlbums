export class FavoriteAlbums {

    name:string;
    artist:object = {name:''}
    imgLink:string;
    like:boolean;
    constructor (name:string, artist:string, imgLink:string, like:boolean){
        this.name = name;
        this.artist['name'] = artist;
        this.imgLink = imgLink;
        this.like = like;

    }

}