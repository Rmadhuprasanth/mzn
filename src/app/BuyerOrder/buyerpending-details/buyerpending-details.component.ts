import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { ConsentModalComponent } from '../consent-modal/consent-modal.component';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-buyerpending-details',
  templateUrl: './buyerpending-details.component.html',
  styleUrls: ['./buyerpending-details.component.css']
})
export class BuyerpendingDetailsComponent implements OnInit {
  lang='English'
  aedata;
  loader='false'
  datalist: any;
  dresssubtypeimg: string;
  MaterialImages: any;
  maturl: string;
  imgUrlPattern: string;
  MaterialImagesfolder: any;
  MaterialType: any;
  MeasurementInEnglish: any;
  MaterialTypeInArabic: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('petternId')
    remove('DressSubTypeId')
    remove('MaterialId')
    remove('ShopId')
    remove('Product_Name')
    remove('Image')
    remove('qty')
    remove('mateimages')
    remove('MaterialTypeId')
    remove('MeasurementType')
    remove('MeasurementInEnglish')
    this.dresssubtypeimg=this.api.imageurl+'DressSubType/'
    this.maturl=this.api.imageurl+'MaterialImages/'
    this.getDetails()
  
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getDetails(){
    var OrderId=getNumber('orderId')
    var TailorId=getNumber("userId")
    // var TailorId=398
    this.api.getbuyerRequestListDetails(OrderId,TailorId).subscribe(res=>{
      console.log("res",res)
      if(res){
        this.loader='false'
        this.page.actionBarHidden = false;
        this.datalist=res['Result']['GetOrderDetail']
        if(this.datalist.length != null){
          this.MaterialType=this.datalist[0]['MaterialType'] 
          this.MeasurementInEnglish=this.datalist[0]['MeasurementInEnglish']
          this.MaterialTypeInArabic=this.datalist[0]['MaterialTypeInArabic']
        }
        this.MaterialImagesfolder=res['Result']['GetMaterialImages']
       
      this.getpatternImage()
      }
 
    })
  }
  getpatternImage(){
      var TailorId=getNumber("userId")
  // var TailorId=398
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
  gotoApprove(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context:{ alerttxt: "Order is Approve After Quoating the Price and Approximate Delivery Date",alerttxtae: "سوف يتم اعتماد الطلب بعد تحديد السعر والوقت المتوقع لإنجاز الطلب" }
    };
    this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
      console.log('rerrr', res);
      setTimeout(() => {
          if(res == 'true'){
            setNumber('DressSubTypeId',  this.datalist[0]['DressType'])
            setNumber('MaterialId',  this.datalist[0]['PatternId'])
            setNumber('ShopId',  this.datalist[0]['ShopId'])
            setString('Product_Name',  this.datalist[0]['Product_Name'])
            setString('Image',  this.datalist[0]['Image'])
            setNumber('qty',  this.datalist[0]['Qty'])
            var mattypeId=Number(this.datalist[0]['MaterialTypeId'])
            setNumber('MaterialTypeId', Number(this.datalist[0]['MaterialTypeId']) )
            setNumber('MeasurementType',  this.datalist[0]['MeasurementType'])
            this.router.navigate(['/BuyerpriceDetailsComponent'])
                   }
          
      }, 1000);
    });
  }



  rejectBuyerRequest(){
    var OrderId=getNumber('orderId')
          var TailorId=getNumber("userId")
  // var TailorId=398
    let data={
      "OrderId":OrderId,
"TailorId":TailorId,
"IsApproved":"2",
"Type":"Tailor",
    }
    console.log('temp',data)
    this.api.approveRejectBuyerRequest(data).subscribe(res=>{
      console.log('res',res)
      if(res['ResponseMsg']=="Success" && res['Result']=="2" ){

if(this.lang=='English'){
  this.showtoast('Rejected !')
}else{
  this.showtoast('مرفوض !')
}
this.router.navigate(['/BuyerpendingListComponent'])
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
  gotoPdf(){
    this.router.navigate(['/PdfviewComponent'])
  }
  goBack(){
    this.router.navigate(['/BuyerpendingListComponent'])
  } 
}
