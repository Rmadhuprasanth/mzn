import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { StatusModalComponent } from '../../status-modal/status-modal.component';
import { StoreStatusModalComponent } from '../../store-status-modal/store-status-modal.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-completed-order-details',
  templateUrl: './completed-order-details.component.html',
  styleUrls: ['./completed-order-details.component.css']
})
export class CompletedOrderDetailsComponent implements OnInit {
  lang='English'
  aedata;
  orderDate: any;
  OrderNo: any;
  TotalAmount: any;
  StichingAndMaterialCharge: any;
  MeasurementCharges: any;
  UrgentStichingCharges: any;
  DeliveryCharge: any;
  MaterialDeliveryCharges: any;
  Total: any;
  GetstoreProductPrice: any;
  GetGrandTotal: any;
  orderItems: any;
  dresssubtypeimg: string;
  storeimg: string;
  MaterialImage: any;
  ReferenceImage: any;
  GetBuyerAddress: any;
  GetPaymentDetails: any;
  GetAppoinmentLeftMateril: any;
  GetAppoinmentLeftMeasurement: any;
  GetPaymentReceivedStatus: any;
  refrenceimgbtn: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef ,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('petternId')
    remove('OrdId')
    this.dresssubtypeimg=this.api.imageurl+'DressSubType/'
    this.storeimg=this.api.imageurl+'Products/'
    this.getDeliverDetails()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getDeliverDetails(){
        var TailorId=getNumber("userId")
          var orderId=getNumber("orderIdfromList")
    //     var TailorId=395
    // var orderId=10
    this.api.orderPendingDetails(orderId,TailorId).subscribe(res=>{
      let data=res['Result']
      if(data['GetStichingOrderDetail'][0]){

        this.orderDate=data['GetStichingOrderDetail'][0]['CreatedOn']
        this.OrderNo=data['GetStichingOrderDetail'][0]['OrderId']
        this.orderItems=data['GetStichingOrderDetail']
      };
      if(data['GetGrandTotal']){
        this.TotalAmount=data['GetGrandTotal'][0]['GrandTotal']
      }
      this.StichingAndMaterialCharge=data['StichingAndMaterialCharge']
      this.MeasurementCharges=data['MeasurementCharges']
      this.UrgentStichingCharges=data['UrgentStichingCharges']
      this.DeliveryCharge=data['DeliveryCharge']
      this.MaterialDeliveryCharges=data['MaterialDeliveryCharges']
      this.Total=data['Total']
      this.GetstoreProductPrice=data['GetstoreProductPrice']
      this.GetGrandTotal=data['GetGrandTotal']
      this.MaterialImage=data['MaterialImage']
      this.GetBuyerAddress=data['GetBuyerAddress']
      this.GetPaymentDetails=data['GetPaymentStatus']
      this.GetAppoinmentLeftMateril=data['GetAppoinmentLeftMateril']
      this.GetAppoinmentLeftMeasurement=data['GetAppoinmentLeftMeasurement']
      this.GetPaymentReceivedStatus=data['GetPaymentReceivedStatus']
      
      this.ReferenceImage=data['ReferenceImage']
      if(this.ReferenceImage.length !=0){
       this.refrenceimgbtn=true
      }else{
        
       this.refrenceimgbtn=false
      }
    })
  }
  gotoTrackStore(orderId){
    setNumber('detailId',orderId)
    this.router.navigate(['/TrackStoreComponent'])

  }
  gotoTrackStitching(orderId){
    setNumber('detailId',orderId)
    this.router.navigate(['/TrackStitchingComponent'])

  }
  createmeasurementappointment(){
    this.router.navigate(['/CreateAppointmentComponent'])
  }
  approveasurementappointment(){
    this.router.navigate(['/ApproveAppointmentComponent'])
  }
  creatematerialappointment(){
    this.router.navigate(['/CreateAppointmentComponent'])
  }
  approvematerialappointment(){
    this.router.navigate(['/ApproveAppointmentComponent'])
  }
  gotostitchingreview(orderId){
    setNumber('OrdId',orderId)
    this.router.navigate(['/WriteReviewComponent'])
  }
  gotoStorereview(orderId){
    setNumber('OrdId',orderId)
    this.router.navigate(['/StoreReviewComponent'])

  }
  gotoMaterial(patternId,detailId){
    setNumber('detailId',detailId)
    setNumber('petternId',patternId)
    setString('mateimages',JSON.stringify(this.MaterialImage))
    this.router.navigate(['/SelectedMaterialComponent'])
  }
  gotoCustomization(detailId){
    setNumber('detailId',detailId)
    this.router.navigate(['/CustomizationComponent'])
  }
  gotoMeasureMent(detailId){
    setNumber('detailId',detailId)
    this.router.navigate(['/MeasurementCompletedComponent'])
  }
  gotoReferenceImg(detailId){
    setNumber('detailId',detailId)
    setString('ReferenceImage',JSON.stringify(this.ReferenceImage))
    this.router.navigate(['/ReferenceImageComponent'])
  }
  gotoUpdateStatus(){
    this.router.navigate(['/SelectedMaterialComponent'])
  }
  goBack(){
    this.router.back()
  } 
}
