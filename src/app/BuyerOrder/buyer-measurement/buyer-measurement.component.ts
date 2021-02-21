import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-buyer-measurement',
  templateUrl: './buyer-measurement.component.html',
  styleUrls: ['./buyer-measurement.component.css']
})
export class BuyerMeasurementComponent implements OnInit {
  lang='English'
  aedata;
  measurement: any;
  imgUrl: string;
  showmsg: boolean;
  showdata: boolean;
  shownodata: boolean;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgUrl=this.api.imageurl+'Measurement2/'
 
      this.getMeasurement()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getMeasurement(){
    var OrderId=getNumber('orderId')
    this.api.getbuyerRequestListMeasurement(OrderId).subscribe(res=>{
      console.log('res',res)
      this.measurement=res['Result']
      if(this.measurement.length !=0){
        if(getString('MeasurementInEnglish') =="Manually"){
          this.showmsg=true
    
        }else{ 
              this.showmsg=false
        }
this.showdata=true
this.shownodata=false
      }else{
        this.showdata=false
        this.shownodata=true
      }
    })
  }
  goBack(){
    this.router.back()
  } 
}
