import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-measurement-completed',
  templateUrl: './measurement-completed.component.html',
  styleUrls: ['./measurement-completed.component.css']
})
export class MeasurementCompletedComponent implements OnInit {
  lang='English'
  aedata;
  measurement;
  imgUrl: string;
  measurementdata;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgUrl=this.api.imageurl+'Measurement2/'
    this.getMeasuremntforOrders()
    this.measurementdata={
      "NameInEnglish":null,
      "CreatedOn":null,
      "DressSubTypeImage":null,
      "Gender":null,
      "measurement":null,
    }
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getMeasuremntforOrders(){
    let OrderId=getNumber('detailId')
    // let OrderId=1
    let type="Order"
    this.api.getMeasurementfororder(OrderId,type).subscribe(res=>{
      console.log('res',res)
      this.measurement=res['Result']
       this.measurementdata['NameInEnglish']=res['Result'][0]['NameInEnglish']
       this.measurementdata['CreatedOn']=res['Result'][0]['CreatedOn']
       this.measurementdata['DressSubTypeImage']=this.api.imageurl+"DressSubType/"+res['Result'][0]['DressSubTypeImage']
       this.measurementdata['Gender']=res['Result'][0]['Gender']
       this.measurementdata['MeasurementBy']=res['Result'][0]['MeasurementBy']
    })
  }
  goBack(){
    this.router.back()
  }
}
