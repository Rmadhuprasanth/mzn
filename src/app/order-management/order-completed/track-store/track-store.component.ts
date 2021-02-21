import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-track-store',
  templateUrl: './track-store.component.html',
  styleUrls: ['./track-store.component.css']
})
export class TrackStoreComponent implements OnInit {
  lang='English'
  aedata;
  items: Object;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.getStoreStatusList()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getStoreStatusList(){
    let detailId=getNumber('detailId')
    // let detailId=15
    this.api.getStoresList(detailId).subscribe(res=>{
     console.log('res',res)
      this.items=res
    })
  }
  goBack(){
    this.router.back()
  } 
}
