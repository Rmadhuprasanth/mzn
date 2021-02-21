import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-buyerapproved-details',
  templateUrl: './buyerapproved-details.component.html',
  styleUrls: ['./buyerapproved-details.component.css']
})
export class BuyerapprovedDetailsComponent implements OnInit {
  lang='English'
  aedata;
  datalist: any;
  imgUrlPattern: string;
  MaterialImages: any;
  dresssubtypeimg: string;
  StichingCharges: any;
  GetMaterialCharge: any;
  MeasurementCharges: any;
  MaterialDeliveryCharges: any;
  Total: any;
  loader='false'
  MaterialImagesfolder: any;
  MaterialType: any;
  MeasurementInEnglish: any;
  MaterialTypeInArabic: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('MeasurementInEnglish')
    this.dresssubtypeimg=this.api.imageurl+'DressSubType/'
    this.getDetails()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getDetails(){
    var OrderId=getNumber('orderId')
    let TailorId=getNumber('userId')
    // var OrderId=15572
    // let TailorId=398
    this.api.getbuyerApprovedDetails(OrderId,TailorId).subscribe(res=>{
      console.log("res",res)
      this.datalist=res['Result']['GetOrderDetail']
      if(this.datalist.length != null){
        this.MaterialType=this.datalist[0]['MaterialType']
        this.MaterialType=this.datalist[0]['MaterialType']
        this.MaterialTypeInArabic=this.datalist[0]['MaterialTypeInArabic']
        this.MeasurementInEnglish=this.datalist[0]['MeasurementInEnglish']
      }
      this.StichingCharges=res['Result']['StichingCharges']
      this.GetMaterialCharge=res['Result']['GetMaterialCharge']
      this.MeasurementCharges=res['Result']['MeasurementCharges']
      this.MaterialDeliveryCharges=res['Result']['MaterialDeliveryCharges']
      this.MaterialImagesfolder=res['Result']['MaterialImage']
      this.Total=res['Result']['Total']
        this.loader='false'
        this.page.actionBarHidden = false;
    this.getpatternImage()
    })
  }

  getpatternImage(){
    let TailorId=getNumber('userId')
    // let TailorId=398
    let MaterialId= this.datalist[0]['PatternId']
    this.api.getMaterialDetailsforOrder(TailorId,MaterialId).subscribe(res=>{
      console.log('res',res)
        if(res['Result']['PatternImg']){
         this.imgUrlPattern=this.api.imageurl+'pattern/'
         this.MaterialImages=res['Result']['PatternImg']
        }
        })
  }

  gotoCustomization(){
    this.router.navigate(['/BuyerCustomizationComponent'])
  }
  gotoMeasurement(){
    setString('MeasurementInEnglish',this.MeasurementInEnglish)
    this.router.navigate(['/BuyerMeasurementComponent'])
  }

  gotomaterial(){
    setNumber('petternId',  this.datalist[0]['PatternId'])
    setString('mateimages',JSON.stringify(this.MaterialImagesfolder))
    this.router.navigate(['/BuyerMaterialComponent'])
  }
  goBack(){
    this.router.navigate(['/BuyerapprovedListComponent'])
  } 

}
