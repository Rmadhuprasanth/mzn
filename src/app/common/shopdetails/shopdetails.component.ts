import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import * as Camera from "nativescript-camera";
import {ImageSource} from "tns-core-modules/image-source";
import { Image } from "tns-core-modules/ui/image";
import { Toasty, ToastPosition } from 'nativescript-toasty';
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { GendermodalComponent } from '../gendermodal/gendermodal.component';
import * as fileupload from "nativescript-background-http"
import { CountryDialogComponent } from '~/app/authentication/country-dialog/country-dialog.component';
import * as imagepicker from "nativescript-imagepicker";
import { TNSHttpFormData, TNSHttpFormDataParam, TNSHttpFormDataResponse } from 'nativescript-http-formdata';
import { knownFolders, Folder, File, path } from "tns-core-modules/file-system";
import { CameramodalComponent } from '../cameramodal/cameramodal.component';
import { MapsComponent } from '../maps/maps.component';
import { ActivatedRoute } from '@angular/router';
import { StateComponent } from '../state/state.component';
import { AreaComponent } from '../area/area.component';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { empty } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Page } from 'tns-core-modules/ui/page';




import { registerElement } from 'nativescript-angular/element-registry';
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import * as geolocation from "nativescript-geolocation";
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
import * as geocoding from "nativescript-geocoding";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-shopdetails',
  templateUrl: './shopdetails.component.html',
  styleUrls: ['./shopdetails.component.css']
})
export class ShopdetailsComponent implements OnInit {
  lang='English'
  aedata;
  loader='false'
  shopprofilearr;
  shopimgurl: string;
  shopuploadimgs;
  showshopimgs;
  countryIdfrommodal: any;
  stateidfrommodal: any;
  headAddr: any;
  country: any;
  countryId: any;
  State: any;
  shopId: any;
  shopForm: FormGroup
  submitted = false;
  profilImageURL: any;
  tailoeimgurl: string;
  imgparams;
  savedlat:number
  savedlan:number
  mapadress: any;


  mapView: MapView;
  latitude:any=0;
  longitude:any=0;
  zoom = 5;
  minZoom = 0;
  maxZoom = 25;
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
  savedlatnew: any;
  savedlannew: any;
  shopuploadimgsfromserver: any=[];
  constructor(private router: RouterExtensions,private viewContainerRef: ViewContainerRef,
    public api:ApiServiceService,private modalService: ModalDialogService,public params:ActivatedRoute,
    public fb: FormBuilder,private page: Page,public aetext:EnANdAeJson) { 
      this.shopForm = this.fb.group ({
        TailorId:new FormControl(''),
        ShopNameInEnglish:new FormControl('', [Validators.required]),
        ShopNameInArabic:new FormControl('', [Validators.required]),
        CountryId:new FormControl(''),
        AreaId:new FormControl(''),
        LandMark:new FormControl('', [Validators.required]),
        AddressInEnglish:new FormControl('', [Validators.required]),
        AddressInArabic:new FormControl('', [Validators.required]),
        Latitude:new FormControl(''),
        Longitude:new FormControl(''),
        ShopProfileId:new FormControl(''),
        CityId:new FormControl(''),
      });
    }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
this.shopuploadimgs=[]
this.showshopimgs=[]
this.imgparams=[]
this.tailoeimgurl = this.api.imageurl + 'TailorImages/'
    this.shopimgurl=this.api.imageurl+'shopimages/'
    this.getTailorProfile()
    this.shopprofilearr={
      "TailorId": "",
     "ShopNameInEnglish": "",
     "ShopNameInArabic": "",
     "CountryName": "",
     "StateName": "",
     "Latitude": "",
     "Longitude": "",
     "AddressInEnglish": "",
     "AddressInArabic": "",
     "ShopOwnerImageURL": "",
     "CityId": "",
     "CountryId": "",
     "AreaId":'',
     "AreaName":"",
     "LandMark":"",

    }
    this.params.queryParams.subscribe(x => {
if(x['shopId']){
  this.getShopProfile(x['shopId'])
  this.shopId=x['shopId']
}
      // <==========================map=============================>
      if (x['addr']) {
        if(getString('array')){

          this.shopprofilearr=JSON.parse(getString('array')) 
        }
        this.mapadress=x['addr']
        // this.shopprofilearr['AddressInEnglish']=x['addr']
        this.shopprofilearr['Latitude']=x['lat']
        this.shopprofilearr['Longitude']=x['lan']
this.savedlat=x['lat']
this.savedlan=x['lan']
        this.api.getcountry().subscribe((result) => {
          this.country=result['Result']
          console.log("header",x.addr)
        let addr = x.addr.split(",")
        if (addr[addr.length - 1].includes('-')) {
          addr = x.addr.split("-")
        }
        switch ((addr[addr.length - 1]).trim()) {
          case "USA":
            addr[addr.length - 1] = "United states";
            break
          case "UK":
            addr[addr.length - 1] = "United kingdom";
            break;
        }
        console.log('addr', addr)
        let addrOrder = addr
        this.country.map((country) => {
          if ((country['Name']).toLowerCase() == ((addrOrder[addrOrder.length - 1]).trim()).toLowerCase()) {
            this.shopprofilearr['CountryName']=country['Name']
            this.shopprofilearr['CountryId']=country['Id']
            this.countryIdfrommodal = country['Id']
          }
        })
 setTimeout(() => {
  let Id={"Id":this.countryIdfrommodal}
  this.api.getstateByCountry(Id).subscribe(res=>{
    this.State=res['Result']
    
    this.State.map((state) => {
      console.log('state',state)
      // console.log('state',(state['StateName']).replace('-', ' ').toLowerCase().replace(/\s/g,''),((addrOrder[addrOrder.length - 2].replace(/[0-9]/g, '')).trim()).toLowerCase())
      if ((state['StateName']).replace('-', ' ').toLowerCase() == ((addrOrder[addrOrder.length - 2].replace(/[0-9]/g, '')).trim()).toLowerCase()) {
       console.log('address',state)
        this.shopprofilearr['StateName']=state['StateName']
        this.shopprofilearr['CityId']=state['Id']
        this.stateidfrommodal=state['Id']
      }
    })
  })
 }, 1000);
 
       

        });
      }
    })
  }

  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getTailorProfile() {
    var TailorId = getNumber("userId");
    this.api.getTailorProfile(TailorId).subscribe(res => {
      let data = res['Result']
      this.profilImageURL= this.tailoeimgurl + data[0]['ShopOwnerImageURL']
    })
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
  getShopProfile(shopId){
    this.showshopimgs=[]
    this.api.getShopProfiledetails(shopId).subscribe(res=>{
      console.log('ressssss',res)
      if(res['Result']['GetShopProfiles'].length !=0){
      let shopdata=res['Result']['GetShopProfiles'][0]
      this.shopprofilearr['TailorId']=shopdata['TailorId']
      this.shopprofilearr['ShopNameInEnglish']=shopdata['ShopNameInEnglish']
      this.shopprofilearr['ShopNameInArabic']=shopdata['ShopNameInArabic']
      this.shopprofilearr['CountryName']=shopdata['CountryName']
      this.shopprofilearr['StateName']=shopdata['StateName']
      this.shopprofilearr['Latitude']=shopdata['Latitude']
      this.shopprofilearr['Longitude']=shopdata['Longitude']
      this.shopprofilearr['AddressInEnglish']=shopdata['AddressInEnglish']
      this.mapadress=shopdata['AddressInEnglish']
      this.shopprofilearr['AddressInArabic']=shopdata['AddressinArabic']
      this.shopprofilearr['ShopOwnerImageURL']=shopdata['ShopOwnerImageURL']
      this.shopprofilearr['CityId']=shopdata['CityId']
      this.stateidfrommodal=shopdata['CityId']
      this.shopprofilearr['CountryId']=shopdata['CountryId']
      this.countryIdfrommodal=shopdata['CountryId']
      console.log('iid',shopdata['CityId'],shopdata['CountryId'])
      this.shopprofilearr['AreaId']=shopdata['AreaId']
      this.shopprofilearr['AreaName']=shopdata['AreaName']
      this.shopprofilearr['LandMark']=shopdata['LandMark']
      // this.showshopimgs=res['Result']['ShopImages']
     this.savedlat=shopdata['Latitude']
      this.savedlan=shopdata['Longitude']
      }
      if(res['Result']['ShopImages'].length !=0){
        
      this.shopuploadimgsfromserver=res['Result']['ShopImages']
      let shpimgdata=res['Result']['ShopImages']
      shpimgdata.map((x,i)=>{
        this.showshopimgs.push({'shopimg':this.api.imageurl+'shopimages/'+x['Image'],'Id':x['Id'],})
      })
      console.log('immgggg',this.showshopimgs)
    }
    })
  }

  opencountrymodal(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
  };
  this.modalService.showModal(CountryDialogComponent, options).then(res => {
    console.log('country',res); 
    this.countryIdfrommodal=res['Id'] 
    this.shopprofilearr['CountryName']=res['CountryName']
    this.shopprofilearr['CountryId']=res['Id']
  });
  }
openStateModel(){
  if(this.countryIdfrommodal){
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context: {countryId:this.countryIdfrommodal}
};
this.modalService.showModal(StateComponent, options).then(res => {
  console.log('state',res); 
  this.stateidfrommodal=res['Id']
  this.shopprofilearr['StateName']=res['StateName']
  this.shopprofilearr['CityId']=res['Id']
  console.log('state', this.shopprofilearr['CityId']);
});
}else{
  if(this.lang=='English'){
    this.api.showtoast('please choose country !')
  }else{
    this.api.showtoast('الرجاء إختيار الدولة')
  }
}
}
openareaModal(){
  if(this.stateidfrommodal){
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context: {stateid: this.stateidfrommodal}
};
this.modalService.showModal(AreaComponent, options).then(res => {
  console.log('area',res); 
  
  this.shopprofilearr['AreaName']=res['Area']
  this.shopprofilearr['AreaId']=res['Id']
});
}else{
  if(this.lang=='English'){
    this.api.showtoast('please choose state !')
  }else{
    this.api.showtoast('الرجاء إختيار المدينة')
  }
}
}
  gotocammadal() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
    };
    this.modalService.showModal(CameramodalComponent, options).then(res => {
      console.log('rerrr', res);
      if (res == 'Camera') {
        this.openprofilecamera()
      } else if (res == 'Gallery') {
        this.openprofilegallery()
      }
    });
  }

 // <==========================camera====================================>
 openprofilecamera() {
   var that=this
  Camera.requestPermissions().then(
    function success() {
  Camera.takePicture().then(picture => {
    console.log("pic", picture)
    that.showshopimgs.push({'shopimg':picture,'Id':''}) 
    that.imgparams.push({ name:"ShopImages", filename:picture["_android"] })
    console.log(';that.imgparams',that.imgparams);
  })
}
  )
}


  // =================================gallery-upload====================================>
  openprofilegallery() {
    var that=this
    var context = imagepicker.create({
      mode: "multiple"
    });

    context.authorize().then(function () {
      return context.present();
    }).then(function (selection) {
      selection.forEach(function(selected) {
        that.showshopimgs.push({'shopimg':selected,'Id':''}) 
        that.imgparams.push({ name:"ShopImages", filename:selected["_android"] })
        console.log(';that.imgparams',that.imgparams);

    });
    
    }).catch(function (e) {
      console.log(e);
    });


  }

insertshopdetails(){
  
  console.log(`this.imgparams`, this.imgparams);
  let text="Are You sure want to submit?"
if(this.lang == 'English'){
text="Are You sure want to submit?"
}else{
  text="هل تريد التقديم؟"
}
    dialogs.confirm(text).then(result => {
      if(result==true){
    this.loader='true'
    if(this.imgparams.length !=0 ||  this.shopuploadimgsfromserver.length !=0){
      if(this.imgparams.length !=0){
this.imgparams.map((x,i)=>{
        var url = this.api.serverUrl+'/FileUpload/UploadFile?';
        var session = fileupload.session("file-upload");
        var request = {
          url: url,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            'Accept': '*/*',
          },
          fileKey: 'ShopImage',
          description: "Uploading ",
          androidAutoDeleteAfterUpload: false,
          androidAutoClearNotification:false,
          androidNotificationTitle: 'Profile image',
 
        };
     
        var task = session.multipartUpload([x], request);
  
        task.on("error", (e) => {
          console.log(`Error processing upload ${e.responseCode} code.`);
        });
        
        task.on("complete", (e) => {
          console.log(`upload complete!`, JSON.stringify(e));
        });
     task.on("responded", (e) => {
          let img = JSON.parse(e.data)
          var datasurl = JSON.stringify(img["Result"]).replace(/\[|\]/g, "")
          let profileimgs = datasurl.replace(/^.*[\\\/]/, '');
          let imgname = profileimgs.replace(/"/g, "");
          if(this.shopId == null || this.shopId == undefined){
            this.shopId=0
          }else{
            this.shopId
          }
          this.shopuploadimgs.push({"ShopProfileId":this.shopId,"Image":imgname})
          this.shopuploadimgsfromserver.push({"ShopProfileId":this.shopId,"Image":imgname})
  console.log(`uploadedssss`,this.shopuploadimgs);



        });
      })
      const interval = setInterval(() => {
        if ( this.imgparams.length == this.shopuploadimgs.length) {
          this.insertdatafinal()
        clearInterval(interval);
        }
        console.log('hiii')
      }, 100)
    }else{
      this.insertdatafinal()
    }
    }else{
      this.loader='false'
      this.page.actionBarHidden = false;
      if(this.lang=='English'){
        this.showtoast('Please select shop Image !')
      }else{
        this.showtoast('الرجاء إختيار صورة صورة للمحل')
      }
    }
  }else{
    this.loader='false'
    this.page.actionBarHidden = false;
  }
    
});
  }
 
  insertdatafinal(){
    if(this.shopId == null || this.shopId == undefined){
      this.shopId=0
    }else{
      this.shopId
    }
    var TailorId=getNumber("userId");
    let data={
      "TailorId": TailorId,
     "ShopNameInEnglish":this.shopprofilearr['ShopNameInEnglish'], 
     "ShopNameInArabic": this.shopprofilearr['ShopNameInArabic'],
     "Latitude":  this.shopprofilearr['Latitude'],
     "Longitude":  this.shopprofilearr['Longitude'],
     "AddressInEnglish":  this.shopprofilearr['AddressInEnglish'],
     "AddressinArabic": this.shopprofilearr['AddressInArabic'],
     "CityId": this.shopprofilearr['CityId'], 
     "CountryId":  this.shopprofilearr['CountryId'],
     'AreaId':this.shopprofilearr['AreaId'],
     "LandMark":this.shopprofilearr['LandMark'],
     "ShopProfileId":this.shopId,
     "ShopImages":this.shopuploadimgsfromserver,
    }
    console.log('datadddd',data)
    
    this.shopForm.value.TailorId=TailorId
    this.shopForm.value.ShopProfileId=this.shopId
    this.shopForm.value.Latitude=this.shopprofilearr['Latitude']
    this.shopForm.value.Longitude= this.shopprofilearr['Longitude']
    console.log('ressss',this.shopForm.value)
    if(this.shopForm.valid){
   
        this.api.updateShopProfile(data).subscribe(res=>{
          console.log('shop',res)
          if(res['ResponseMsg'] == 'Success'){
            
this.loader='false'
this.page.actionBarHidden = false;
if(this.lang=='English'){
  this.showtoast('Branch Created !')
}else{
  this.showtoast('تم إنشاء الفرع بنجاح')
}
            this.router.navigate(['/Profile'],{queryParams:{'pageid':'fromstore'}})
          }
        })
  
    }else{
      this.loader='false'
      this.page.actionBarHidden = false;
      if(this.lang=='English'){
        dialogs.alert("Please Fill All the fields !").then(()=> {
        });
      }else{
      dialogs.alert("الرجاء تحديث جميع البيانات").then(()=> {
      });
      }
    }
  }
  removeimg(img,Id){
    console.log('iiiiii',img)
    // <---------removing from cam or gallary-displayed---------
this.showshopimgs.map(x=>{
  if(x['shopimg'] == img){
    this.showshopimgs = this.showshopimgs.filter(e => e['shopimg'] !== img)
  }
})
// <---------removing from cam or gallary----------
if(img._android){
  this.imgparams.map(x=>{
    if(x['filename'] == img._android){
      this.imgparams = this.imgparams.filter(e => e['filename'] !== img._android)
    }
  })
}else if(Id){
  // <---------removing from existing from backend(already uploaded)----------
  this.shopuploadimgsfromserver.map(x=>{
    if(x['Id'] == Id){
      this.shopuploadimgsfromserver = this.shopuploadimgsfromserver.filter(e => e['Id'] !== Id)
    }
  })
}
  }
  openmapmodal(){
    setString('array',JSON.stringify(this.shopprofilearr))
this.router.navigate(['/mapmodal'],{queryParams:{"lat":this.savedlat,"lang":this.savedlan}})
  }

  showtoast(val){
    const toast = new Toasty({ text: val});
    toast.textColor = '#fff';
    toast.backgroundColor ='gray';
    toast.position=ToastPosition.CENTER
     toast.show();
  }






  onMapReady(event) {  
    console.log('Map Ready');

    const mapView: MapView = event.object;
    this.mapView = mapView;
    if(this.savedlatnew !=null && this.savedlannew !=null){
console.log('hh')
      this.savedlatnew=this.savedlat
      this.savedlannew=this.savedlan
    }else{
      console.log('hello')
      this.savedlatnew=getNumber('lat')
      this.savedlannew=getNumber('lan')
  
    }
    if(this.savedlatnew !=null && this.savedlannew !=null){

      console.log("Setting a marker...");
  // <=======================geolocation==============================>
  geolocation.enableLocationRequest(true)
  .then(() => {
    geolocation.isEnabled().then(isLocationEnabled => {
      if(!isLocationEnabled) {
        return;
      }
      geolocation.getCurrentLocation({})
      .then(result => {
        this.latitude=  this.savedlatnew
        this.longitude=  this.savedlannew
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
//   const imageSource = ImageSource.fromFileSync( "~/assets/profile/Set from map.png");
//  const icon = new Image();
//  icon.imageSource = imageSource;
//  marker.icon = icon;
  marker.draggable=true
  marker.userData = { index : 1};
  this.mapView.addMarker(marker);
}




}
