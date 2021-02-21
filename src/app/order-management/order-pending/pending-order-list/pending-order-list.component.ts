import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import { PlatformLocation } from '@angular/common';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-pending-order-list',
  templateUrl: './pending-order-list.component.html',
  styleUrls: ['./pending-order-list.component.css']
})
export class PendingOrderListComponent implements OnInit {
  lang='English'
  aedata;
pendingList;
  imageurl: string;
  loader='false'
  imageurlstitching: string;
  showdata: boolean;
  showtext: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private location : PlatformLocation,
    public aetext:EnANdAeJson) { }
 
  ngOnInit(){
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.loader='true'
    setTimeout(() => {
      this.loader='false'
      this.page.actionBarHidden = false;
    }, 1000);
    remove("OrderId")
    this.imageurl=this.api.imageurl+"Products/"
    this.imageurlstitching=this.api.imageurl+"DressSubType/"
    this.getAllPendingList()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllPendingList(){
    var TailorId=getNumber("userId")
    // var TailorId=395
    this.api.orderPendingList(TailorId).subscribe(res=>{
      console.log('res',res)
      this.pendingList=res['Result']
      if(this.pendingList.length !=0){
        this.showdata=true
        this.showtext=false
      }else{
        this.showdata=false
        this.showtext=true
      }
    })
  }
  gotoDetails(orderId){
    setNumber('orderIdfromList',orderId)
    this.router.navigate(['/PendingOrderDetailsComponent'])
  }
  goBack(){
    this.router.navigate(['/homenew'])
  } 
}
