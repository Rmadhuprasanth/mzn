import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.css']
})
export class NewPromotionComponent implements OnInit {
  lang='English'
  aedata;
  flatcheck=true
  loader='false'
  banner;
  bannerurl: string;
  selectedbannerId: any;
  selectedimg: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void { 
    this.api.sideDrawer = false;
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.bannerurl=this.api.imageurl+'offer/'
    this.getBanner()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getBanner(){
    this.api.getofferBanner().subscribe(res=>{
      console.log('res',res)
      this.banner=res['Result']
    })
  }
  selectbanner(Id,image){
    this.selectedbannerId=Id
    this.selectedimg=image
  }
  saveselected(){
    setString('bannerimage', this.selectedimg)
    setNumber('bannerId', this.selectedbannerId)
    this.router.navigate(['/PromotionHomeComponent'])
  }
  goBack(){
    this.router.navigate(['/PromotionHomeComponent'])
  }
}
