import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  lang='English'
  aedata;
  notifications: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.getAllnotifications()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAllnotifications(){
    let type="tailor"
    let tailorId=getNumber("userId")
    this.api.getAllNotifications(type,tailorId).subscribe(res=>{
      console.log('res',res['Result'][4])
      this.notifications=res['Result']
    })
  }
  goBack(){
    this.router.back()
  }
}
