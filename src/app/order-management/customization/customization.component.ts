import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements OnInit {
  lang='English'
  aedata;
customization;
  imgUrl: string;
  zoomimg: string;
  hidemain: boolean;
  hidetext: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgUrl=this.api.imageurl+'Customazation3/'
    this.getCustomizationforOrder()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getCustomizationforOrder(){
    
    let orderId=getNumber('detailId')
    // let orderId=1
this.api.getCustomizationforOrder(orderId).subscribe(res=>{
  console.log('res',res)
  if(res['Result']['Customization'] !=0){
  this.zoomimg=this.api.imageurl+'Customazation3/'+res['Result']['Customization'][0]['Images']
  this.customization=res['Result']['Customization']
    this.hidemain=true
    this.hidetext=false
  }else{
    this.hidemain=false
    this.hidetext=true
  }
})
  }
  selecimg(img){
    this.zoomimg=this.api.imageurl+'Customazation3/'+img
    console.log('res',this.zoomimg)
  }
  goBack(){
    this.router.back()
  } 
}
