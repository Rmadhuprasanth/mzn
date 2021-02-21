import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { EMPTY } from 'rxjs';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-buyerprice-details',
  templateUrl: './buyerprice-details.component.html',
  styleUrls: ['./buyerprice-details.component.css']
})
export class BuyerpriceDetailsComponent implements OnInit {
  lang='English'
  aedata;
  minDate: Date = new Date(1975, 0, 29);
  maxDate: Date = new Date(2045, 4, 12);
  minvalidDate: Date = new Date();
  maxvalidDate: Date = new Date(2045, 4, 12);
  showdategrid='false'
  dateshow: boolean;
  selecteddate: string;
  stitchingCharge: any;
  MaterialCharge: any;
  measurementCharge='0';
  matCollection='0';
  showdategridvalidity='false';
  dateshowvalidity: boolean;
  selectedValiddate: string;
  charges;
  total: any;
  NooFDays: any;
  productName: string;
  productImg: string;
  Qty: number;
  MeasurementType;
  MaterialTypeId;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private datePipe: DatePipe,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.charges=[{'TailorChargesId':1,'Amount':'0'},{'TailorChargesId':2,'Amount':'0'},{'TailorChargesId':3,'Amount':'0'},{'TailorChargesId':5,'Amount':'0'}]
    this.getstitchingCharges()
    this.getMaterialCharges()
    this.productName=getString('Product_Name')
    this.productImg=this.api.imageurl+'DressSubType/'+getString('Image')
    this.Qty=getNumber('qty')
    this.MaterialTypeId=getNumber('MaterialTypeId')
    this.MeasurementType=getNumber('MeasurementType')
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }

  dateclick(showdategrid){
    if(showdategrid == 'false'){
      this.showdategrid='true'
      this.dateshow=true
    }else{
      this.showdategrid='false'
      this.dateshow=false
    }
      }
      datevalididty(showdategridvalididty){
        if(showdategridvalididty == 'false'){
          this.showdategridvalidity='true'
          this.dateshowvalidity=true
        }else{
          this.showdategridvalidity='false'
          this.dateshowvalidity=false
        }
      }
      // .setDate(date.getDate() + 1)
      onDateChanged(args) {
        console.log("Date New value: " + args.value);
        this.selecteddate=this.datePipe.transform(args.value)
    }
    onvalidDateChanged(args){
      console.log("Date New value: " + args.value);
      this.selectedValiddate=this.datePipe.transform(args.value)
    }
    getstitchingCharges(){
     var DressSubTypeId=getNumber('DressSubTypeId')
        var TailorId=getNumber("userId")
  // var TailorId=398
  this.api.getbuyerRequestStitchingCgarge(TailorId,DressSubTypeId).subscribe(res=>{
    this.stitchingCharge=res['Result']
    this.charges.map((x,i)=>{
      if(x['TailorChargesId'] == 1){
        this.charges[i]['Amount']=res['Result']
      }
    })
    this.total=parseInt(this.stitchingCharge)+parseInt(this.MaterialCharge)
    console.log('resssss', this.total)
  })
    }

    getMaterialCharges(){
      var DressSubTypeId=getNumber('DressSubTypeId')
      var MaterialId=getNumber('MaterialId')
         var TailorId=getNumber("userId")
  //  var TailorId=398
   this.api.getbuyerRequestMaterialCgarge(TailorId,DressSubTypeId,MaterialId).subscribe(res=>{
     this.MaterialCharge=res['Result']
     this.charges.map((x,i)=>{
      if(x['TailorChargesId'] == 2){
        this.charges[i]['Amount']=res['Result']
      }
    })
     this.total=parseInt(this.stitchingCharge)+parseInt(this.MaterialCharge)
     console.log('resssss', this.total)
   })
     }
     stitchingcharges(args,Id){
      this.total=Number(args.value)+Number(this.MaterialCharge)+Number(this.matCollection)+Number(this.measurementCharge)
     
      this.charges.map((x,i)=>{
if(x['TailorChargesId'] == Id){
  this.charges[i]['TailorChargesId']=Id
  this.charges[i]['Amount']=args.value
}
      })
     }
    materialcharges(args,Id){
      this.total=Number(this.stitchingCharge)+Number(args.value)+Number(this.matCollection)+Number(this.measurementCharge)
      this.charges.map((x,i)=>{
if(x['TailorChargesId'] == Id){
  this.charges[i]['TailorChargesId']=Id
  this.charges[i]['Amount']=args.value
}
      })
     }
     measurmentcharges(args,Id){
      this.total=Number(this.stitchingCharge)+Number(this.MaterialCharge)+Number(this.matCollection)+Number(args.value)
      this.charges.map((x,i)=>{
if(x['TailorChargesId'] == Id){
  this.charges[i]['TailorChargesId']=Id
  this.charges[i]['Amount']=args.value
}
      })
     }

     matCollectioncharges(args,Id){
      this.total=Number(this.stitchingCharge)+Number(this.MaterialCharge)+Number(args.value)+Number(this.measurementCharge)
      this.charges.map((x,i)=>{
if(x['TailorChargesId'] == Id){
  this.charges[i]['TailorChargesId']=Id
  this.charges[i]['Amount']=args.value
}
      })
     }
     getnoOfDays(days){
this.NooFDays=days.value
var date = new Date();
let newdate=Number(this.NooFDays)+1
date.setDate(date.getDate() + newdate);
this.selecteddate=this.datePipe.transform(date)
if(!days.value){
  this.selecteddate=null
}
     }
insertTailorCharges(){
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context:{ alerttxt: "Are you sure want to Proceed!",alerttxtae:'هل تريد المتابعة؟' }
  };
  this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
    console.log('rerrr', res);
    setTimeout(() => {
      if(res == 'true'){
      var TailorId=getNumber("userId")
      var OrderId=getNumber('orderId')
      var ShopId=getNumber('ShopId')
      let temp={
        "OrderId":OrderId,
    "TailorId":TailorId,
    "ShopId":ShopId,
    "StichingTime":this.NooFDays,
    "ApproximateDeliveryTime":  this.selecteddate,
    "TailorCharges":this.charges,
    "ValidDt":this.selectedValiddate,
      }
      console.log("temp",temp)
      this.api.insertTailorCharges(temp).subscribe(res=>{
        console.log("res",res)
        if(res['Result'] == 1){
          this.ApproveBuyerRequest()
          if(this.lang=='English'){
            this.showtoast('successFully Updated')
          }else{
            this.showtoast('تم التحديث بنجاح')
          }
        }else{
          
          if(this.lang=='English'){
            this.showtoast('Error while Processing !')
          }else{
            this.showtoast('حدث خطأ أثناء المعالجة')
          }
        }
      },err=>{
        if(err){
           
          if(this.lang=='English'){
            this.showtoast('Error while Processing !')
          }else{
            this.showtoast('حدث خطأ أثناء المعالجة')
          }
        }
      })
    }
    },200)
  })

}
ApproveBuyerRequest(){
  var OrderId=getNumber('orderId')
        var TailorId=getNumber("userId")
// var TailorId=398
  let data={
    "OrderId":OrderId,
"TailorId":TailorId,
"IsApproved":"1",
"Type":"Tailor",
  }
  console.log('temp',data)
  this.api.approveRejectBuyerRequest(data).subscribe(res=>{
    console.log('res',res)
    if(res['ResponseMsg']=="Success" && res['Result']=="1" ){
      if(this.lang=='English'){
        this.showtoast('Approved !')
      }else{
        this.showtoast('معتمد')
      }
      this.router.navigate(['/homenew'])
    }
  })
}
showtoast(val){
  const toast = new Toasty({ text: val});
  toast.textColor = '#fff';
  toast.backgroundColor ='gray';
  toast.position=ToastPosition.CENTER
   toast.show();
}
  goBack(){
    this.router.back()
  } 
}
