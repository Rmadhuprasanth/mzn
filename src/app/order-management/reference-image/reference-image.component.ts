import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-reference-image',
  templateUrl: './reference-image.component.html',
  styleUrls: ['./reference-image.component.css']
})
export class ReferenceImageComponent implements OnInit {
  lang='English'
  aedata;
  customization=[{'id':""},{'id':""},{'id':""},{'id':""},{'id':""},{'id':""},{'id':""},]
  ReferenceImage: any;
  imgUrl: string;
  zooimg: string;
  detailId: number;
  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.detailId=getNumber('detailId')
    this.imgUrl=this.api.imageurl+'ReferenceImages/'
    this.ReferenceImage=JSON.parse(getString('ReferenceImage'))
    console.log('ref',  this.ReferenceImage)
    this.ReferenceImage.map(x=>{
      if(this.detailId==x['DetailId']){
        this.zooimg=this.api.imageurl+'ReferenceImages/'+x['Image']
      }
    })
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  selectimg(img){
    this.zooimg=this.api.imageurl+'ReferenceImages/'+img
    console.log('ref',this.zooimg)
  }
  goBack(){
    this.router.back()
  } 
}
