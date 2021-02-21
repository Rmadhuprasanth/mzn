import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { StatusModalComponent } from '../../status-modal/status-modal.component';
import { StoreStatusModalComponent } from '../../store-status-modal/store-status-modal.component';
import { Page } from 'tns-core-modules/ui/page';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-pending-order-details',
  templateUrl: './pending-order-details.component.html',
  styleUrls: ['./pending-order-details.component.css']
})
export class PendingOrderDetailsComponent implements OnInit {
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

  loader='false'
  refrenceimgbtn: boolean;
  showdetails: boolean;
  measurementcheck: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('petternId')
    remove('OrdId')
    remove('detailId')
    remove('type')
    remove('ordertypeId')
    remove('userIdformeasure')
    remove('dresstypeId')
    remove('dressName')
    remove('MeasurementTypeId')
    remove('MeasurementId')
    remove('SellerId')
    this.dresssubtypeimg=this.api.imageurl+'DressSubType/'
    this.storeimg=this.api.imageurl+'Products/'
    this.getPendingDetails()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getPendingDetails(){
    this.loader='true'
        var TailorId=getNumber("userId")
        var orderId=getNumber("orderIdfromList")
    //     var TailorId=395
    // var orderId=10
    this.api.orderPendingDetails(orderId,TailorId).subscribe(res=>{
      console.log('res',res)
      let data=res['Result']
      if(data['GetStichingOrderDetail'][0]){

        this.orderDate=data['GetStichingOrderDetail'][0]['CreatedOn']
        this.OrderNo=data['GetStichingOrderDetail'][0]['OrderId']
        this.measurementcheck=data['GetStichingOrderDetail'][0]['MeasurementId']
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
     
      let materialdata=data['GetAppoinmentLeftMateril']
      if(materialdata.length !=0){
        this.GetAppoinmentLeftMateril=data['GetAppoinmentLeftMateril']
      }else{
        let itemmat=[{'Id':1}]
        this.GetAppoinmentLeftMateril=itemmat
      }
      let measuredata=data['GetAppoinmentLeftMeasurement']
      if(measuredata.length !=0){
        this.GetAppoinmentLeftMeasurement=data['GetAppoinmentLeftMeasurement']
      }else{
        let item=[{'Id':1}]
        this.GetAppoinmentLeftMeasurement=item
      }
      this.GetPaymentReceivedStatus=data['GetPaymentReceivedStatus']
      this.ReferenceImage=data['ReferenceImage']
      if(this.ReferenceImage.length !=0){
        this.refrenceimgbtn=true
       }else{
         
        this.refrenceimgbtn=false
       }
     
  this.loader='false'
  this.page.actionBarHidden = false;
    })
  }

  updateStatus(detailId,MeasurementId){
    // console.log('id',MeasurementId)
    // if(MeasurementId !=0){
          const options: ModalDialogOptions = {
            viewContainerRef: this.viewContainerRef,
            fullscreen: false,
            context: {detailId:detailId}
        };
        this.modalService.showModal(StatusModalComponent, options).then(res => {
          // console.log('rerrr',res);
        });
        
    // }else if(MeasurementId ==0){
    //   this.api.showtoast('Please select Measurement!')
    // }

  }
  updateStoreStatus(detailId){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {detailId:detailId}
  };
  this.modalService.showModal(StoreStatusModalComponent, options).then(res => {
    // console.log('rerrr',res);
  });
  }
  createmeasurementappointment(detailId,val){
    setNumber('detailId',detailId)
    setString('type',val)
    this.router.navigate(['/CreateAppointmentComponent'])
  }
  creatematerialappointment(detailId,val){
    setNumber('detailId',detailId)
    setString('type',val)
    this.router.navigate(['/CreateAppointmentComponent'])
  }
  approveasurementappointment(detailId,val){
    setNumber('detailId',detailId)
    setString('type',val)
    this.router.navigate(['/ApproveAppointmentComponent'])
  }
  approvematerialappointment(detailId,val){
    setNumber('detailId',detailId)
    setString('type',val)
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
  gotoMeasureMent(detailId,ordertypeId,userId,dresstypeId,dressName,MeasurementTypeId,DressSubTypeId,MeasurementId,SellerId){
    setNumber('detailId',detailId)
    setNumber('ordertypeId',ordertypeId)
    setNumber('userIdformeasure',userId)
    setNumber('dresstypeId',dresstypeId)
    setString('dressName',dressName)
    setNumber('MeasurementTypeId',MeasurementTypeId)
    setNumber('DressSubTypeId',DressSubTypeId)
    setNumber('MeasurementId',MeasurementId)
    setNumber('SellerId',SellerId)
    this.router.navigate(['/MeasurementComponent'])
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
    this.router.navigate(['/PendingOrderListComponent'])
  } 
}
