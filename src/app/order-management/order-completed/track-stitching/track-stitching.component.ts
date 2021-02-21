import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-track-stitching',
  templateUrl: './track-stitching.component.html',
  styleUrls: ['./track-stitching.component.css']
})
export class TrackStitchingComponent implements OnInit {
  lang='English'
  aedata;
  items: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.getStitchingStatusList()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getStitchingStatusList(){
    let detailId=getNumber('detailId')
    // let detailId=1
    this.api.getTrackingListStitching(detailId).subscribe(res=>{
      console.log('res',res)
      this.items=res['Result']
    })
  }
  goBack(){
    this.router.back()
  } 
}
