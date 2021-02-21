import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-completed-order-list',
  templateUrl: './completed-order-list.component.html',
  styleUrls: ['./completed-order-list.component.css']
})
export class CompletedOrderListComponent implements OnInit {
  lang='English'
  aedata;
  pendingList;
  imageurl: string;
  imageurlstitching: string;
  showdata: boolean;
  showtext: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit() {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+"Products/"
    this.imageurlstitching=this.api.imageurl+"DressSubType/"
    this.getAllCompletedList()
  } 
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllCompletedList(){
    var TailorId=getNumber("userId")
    this.api.orderCompletedList(TailorId).subscribe(res=>{
      console.log('Completed',res)
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
    this.router.navigate(['/CompletedOrderDetailsComponent'])
  }
  goBack(){
    this.router.back()
  } 
}
