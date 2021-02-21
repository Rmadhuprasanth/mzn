import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import { PlatformLocation } from '@angular/common';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-submitted-list',
  templateUrl: './submitted-list.component.html',
  styleUrls: ['./submitted-list.component.css']
})
export class SubmittedListComponent implements OnInit {
  lang='English'
  aedata;
  appSubmittedqutationList;
  loader='false'
  imageurlstitching: string;
  showdata: boolean;
  showtext: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private location : PlatformLocation, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    setTimeout(() => {
      this.loader='false'
      this.page.actionBarHidden = false;
    }, 1000);
    this.imageurlstitching=this.api.imageurl+"DressSubType/"
    this.getAllappointmentList()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllappointmentList(){
    var TailorId=getNumber("userId")
    // var TailorId=440
    this.api.getSubmittedqutationList(TailorId).subscribe(res=>{
      console.log('res',res)
      this.appSubmittedqutationList=res['Result']
      if(this.appSubmittedqutationList.length !=0){
        this.showdata=true
        this.showtext=false
      }else{
        this.showdata=false
        this.showtext=true
      }
    })
  }
  goBack(){
    this.router.back()
  }
}
