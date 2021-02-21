import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import * as dialogs from "tns-core-modules/ui/dialogs";
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-storelist',
  templateUrl: './storelist.component.html',
  styleUrls: ['./storelist.component.css']
})
export class StorelistComponent implements OnInit {
  lang='English'
  Branches: any;  
  selectedindexval: string;
  tailoeimgurl: string;
  profilImageURL: string;
  aedata;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void { 
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.tailoeimgurl = this.api.imageurl + 'TailorImages/'
    this.selectedindex('1')
    remove('shopId')
    this. getshoplist()
    this.getTailorProfile()
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
  selectedindex(val){
    if(val=='0'){
  
      this.router.navigate(['/homenew'])  
      this.selectedindexval='0'
    }else if(val=='1'){
      this.router.navigate(['/StorelistComponent']) 
      this.selectedindexval='1'
    }else if(val=='2'){   
      this.router.navigate(['/skillupdate']) 
      this.selectedindexval='2'
    }else if(val=='3'){
      this.router.navigate(['/Profile']) 
      this.selectedindexval='3'
    }
  } 
  getshoplist() {

    var TailorId=getNumber("userId");
    // var TailorId = "259";
    this.api.getshoplist(TailorId).subscribe(res => {
      console.log('reyyys', res)
      this.Branches=res['Result']
      if(this.Branches.length == 0){
        dialogs.confirm("Your Branch Is Empty.Please Add Branch!").then(result => {
          if(result==true){
      
            this.router.navigate(['/Profile'])
          }
      
      });
      }
    })
    
  }

  gotostoreTimings(shopId){
    setNumber('shopId',shopId)
    this.router.navigate(['/dashboard'])
  }
  goBack(){
    this.router.back()
  }
  gotoNotifications(){
    this.router.navigate(['/NotificationsComponent'])
  
  }
}
