import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import { Router, ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import * as geocoding from "nativescript-geocoding";


import { TokenModel, AutoCompleteCompletionMode, AutoCompleteDisplayMode, AutoCompleteLayoutMode, AutoCompleteSuggestMode } from "nativescript-ui-autocomplete";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { setNumber } from 'tns-core-modules/application-settings';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {  
  lang='English'
  aedata;
  // @ViewChild("MapView", {static: false}) mapView: ElementRef;
  private _items: ObservableArray<TokenModel>;
    private countries = [];
     @ViewChild("autocomplete", { static: false }) autocomplete: RadAutoCompleteTextViewComponent;
  mapView: MapView;
  latitude:any=0;
  longitude:any=0;
  zoom = 15;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  lastCamera: String;
  mapboxView: any;
  mapbox: any;
  addr: any;
  addresslist: any;
  places;
  selectedaddress: any;
  savedlat:any;
  savedlang:any;
  constructor(public router:RouterExtensions,public params:ActivatedRoute,public aetext:EnANdAeJson) { 
    this.initDataItems();
  }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.places=[]
   
    this.params.queryParams.subscribe(x=>{
      console.log('x[id]',x)
      if(x['lat'] && x['lang']){
        this.savedlat=x['lat']
        this.savedlang=x['lang']
      }else{
        // this.getLocation() 
      }
    })
    
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }



  get dataItems(): ObservableArray<TokenModel> {
    return this._items;
}

  initDataItems() {
    this._items = new ObservableArray<TokenModel>();

    for (let i = 0; i < this.countries.length; i++) {
        this._items.push(new TokenModel(this.countries[i], undefined));
    }
}



  onMapReady(event) {  
    console.log('Map Ready');

    const mapView: MapView = event.object;
    this.mapView = mapView;
  

    console.log("Setting a marker...");
    if(this.savedlat !=null && this.savedlang !=null){

  // <=======================geolocation==============================>
  geolocation.enableLocationRequest(true)
  .then(() => {
    geolocation.isEnabled().then(isLocationEnabled => {
      if(!isLocationEnabled) {
        return;
      }
      geolocation.getCurrentLocation({})
      .then(result => {
        this.latitude=JSON.parse(this.savedlat)
        this.longitude=JSON.parse(this.savedlang)
        console.log('map result',  this.latitude,this.longitude);
        this.getmarkers(this.latitude,this.longitude)
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              this.latitude +
                  "," +
                  this.longitude +
                  "&key=AIzaSyAnXuCD5yAd8cmhRcsNWE8MLNCr8WQGSXU"
          )
              .then(response => response.json())
              .then(r => {
                this.addr = r.results[0].formatted_address;
                 console.log("currentaddress"+ this.addr)
              });
      })
      .catch(e => {
        console.log('loc error', e);
      });
    });
  });
    }else{


  // <=======================geolocation==============================>
  geolocation.enableLocationRequest(true)
  .then(() => {
    geolocation.isEnabled().then(isLocationEnabled => {
      if(!isLocationEnabled) {
        return;
      }
      geolocation.getCurrentLocation({})
      .then(result => {
        console.log('map result', result);
        this.latitude=result['latitude']
        this.longitude=result['longitude']
        this.getmarkers(this.latitude,this.longitude)
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              result.latitude +
                  "," +
                  result.longitude +
                  "&key=AIzaSyAnXuCD5yAd8cmhRcsNWE8MLNCr8WQGSXU"
          )
              .then(response => response.json())
              .then(r => {
                this.addr = r.results[0].formatted_address;
                 console.log("currentaddress"+ this.addr)
              });
      })
      .catch(e => {
        console.log('loc error', e);
      });
    });
  });

}
  // <=======================geolocation==============================>
}

onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
 
}

onMarkerEvent(args) {
    console.log("Marker Event: '" +args.marker.position.latitude);
  geolocation.enableLocationRequest(true)
  .then(() => {
    geolocation.isEnabled().then(isLocationEnabled => {
      if(!isLocationEnabled) {
        return;
      }
  
      geolocation.getCurrentLocation({})
      .then(result => {
        console.log('marker result', result);
        this.latitude=args.marker.position.latitude
        this.longitude=args.marker.position.longitude
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              this.latitude +
                  "," +
                  this.longitude +
                  "&key=AIzaSyAnXuCD5yAd8cmhRcsNWE8MLNCr8WQGSXU"
          )
              .then(response => response.json())
              .then(r => {
                this.addr = r.results[0].formatted_address;
                 console.log("Markeraddress"+ this.addr)
              });
      })
      .catch(e => {
        console.log('loc error', e);
      });
    });
  });
    
}

onCameraChanged(args) {
    // console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);

}

onCameraMove(args) {
    // console.log("Camera moving: " , JSON.stringify(args.camera));
   
}
getmarkers(lat,lang){
  var marker = new Marker();
  marker.position = Position.positionFromLatLng(lat,lang);
  marker.draggable=true
  marker.userData = { index : 1};
  this.mapView.addMarker(marker);
}




searchadresss(adress){
  this.places=[]
  console.log('vallll',adress.value)
  let API_KEY ="AIzaSyAnXuCD5yAd8cmhRcsNWE8MLNCr8WQGSXU";
  let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);

  googlePlacesAutocomplete.search(adress.value)
        .then((places: any) => {
           
          // console.log(JSON.stringify(places[0]))
          this._items = new ObservableArray<TokenModel>();

          for (let i = 0; i < places.length; i++) {
            this.places.push({'description':places[i]['description']})
              this._items.push(new TokenModel(places[i]['description'], undefined));
          }
        
          console.log('this.places',this.places)
         }, (error => {
            console.log(error)
        }));
}
getgeocodes(placeadress){
  this.mapView.removeAllMarkers();
  this.selectedaddress=placeadress
  if(this.selectedaddress != null || this.selectedaddress != undefined){
    this.places=[]
  }
  console.log('placeadress ', placeadress);
  geocoding.getLocationFromName(placeadress).then(loc => {
     // <=======================geolocation==============================>
  geolocation.enableLocationRequest(true)
  .then(() => {
    geolocation.isEnabled().then(isLocationEnabled => {
      if(!isLocationEnabled) {
        return;
      }
  
      // MUST pass empty object!!
      geolocation.getCurrentLocation({})
      .then(result => {
        console.log('marker result', result);
        this.latitude=loc['latitude']
        this.longitude=loc['longitude']
            fetch(
              "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
              this.latitude +
                  "," +
                  this.longitude +
                  "&key=AIzaSyAnXuCD5yAd8cmhRcsNWE8MLNCr8WQGSXU"
          )
              .then(response => response.json())
              .then(r => {
                this.getmarkers(this.latitude,this.longitude)
                this.addr = r.results[0].formatted_address;
                 console.log("address"+ this.addr)
              });
      })
      .catch(e => {
        console.log('loc error', e);
      });
    });
  });
  // <=======================geolocation==============================>

}, function (e) {
    console.log("Error: " + (e.message || e));
});
}
gotoshopprofile(){
  console.log('lats',this.latitude,this.longitude)
  setNumber('lat',this.latitude)
  setNumber('lan',this.longitude)
this.router.navigate(['/shopdetails'],{ queryParams: { "addr" :this.addr,'lat':this.latitude,'lan':this.longitude } })
}
}

