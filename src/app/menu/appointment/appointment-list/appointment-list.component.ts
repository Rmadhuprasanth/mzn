import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import { PlatformLocation } from '@angular/common';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  lang='English'
  aedata;
  appointmentList;
  loader='false'
  imageurlstitching: string;
  showdata: boolean;
  showtext: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private location : PlatformLocation, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('orderId')
remove('OrderTypeId')
remove('MeasurementTypeId')
    this.loader='true'
    setTimeout(() => {
      this.loader='false'
      this.page.actionBarHidden = false;
    }, 1000);
    remove("OrderId")
    this.imageurlstitching=this.api.imageurl+"DressSubType/"
    this.getAllappointmentList()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllappointmentList(){
    var TailorId=getNumber("userId")
    // var TailorId=398
    this.api.appointMentList(TailorId).subscribe(res=>{
      console.log('res',res)
      this.appointmentList=res['Result']
      if(res){
        if(this.appointmentList.length !=0){
          this.showdata=true
          this.showtext=false
        }else{
          this.showdata=false
          this.showtext=true
        }
      }
   
    })
  }
  gotocreateappointment(OrderId,OrderTypeId,MeasurementTypeId){
setNumber('orderId',OrderId)
setNumber('OrderTypeId',Number(OrderTypeId))
setNumber('MeasurementTypeId',MeasurementTypeId)
    this.router.navigate(['/CreateDirectAppointmentComponent'])
  }
  goBack(){
    this.router.navigate(['/homenew'])
  }
}
