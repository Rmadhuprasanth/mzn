import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-buyer-customization',
  templateUrl: './buyer-customization.component.html',
  styleUrls: ['./buyer-customization.component.css']
})
export class BuyerCustomizationComponent implements OnInit {
  lang='English'
  aedata;
  imgUrl: string;
  zoomimg: string;
  customization: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgUrl=this.api.imageurl+'Customazation3/'
    this.getCustomization()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getCustomization(){
    var OrderId=getNumber('orderId')
    this.api.getbuyerRequestListCustomization(OrderId).subscribe(res=>{
      console.log('res',res)
      let data=res['Result']['Customization']
      this.customization=res['Result']['Customization']
      this.zoomimg=this.api.imageurl+'Customazation3/'+data[0]['Images']
    })
  }
  selecimg(img){
this.zoomimg=this.api.imageurl+'Customazation3/'+img
  }
  goBack(){
    this.router.back()
  } 
}
