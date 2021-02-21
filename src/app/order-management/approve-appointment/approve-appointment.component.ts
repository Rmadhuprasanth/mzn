import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-approve-appointment',
  templateUrl: './approve-appointment.component.html',
  styleUrls: ['./approve-appointment.component.css']
})
export class ApproveAppointmentComponent implements OnInit {
  lang='English'
  aedata;
  appointmentdata: any;
  imgUrl: string;
  rejectedReason=null;
  rejecttxt: boolean;

  constructor(public router:RouterExtensions,public api:ApiServiceService, private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.appointmentdata={
      "OrderId":"",
      "DetailId":"",
      "AppointmentId":"",
      "OrderTypeId":"",
      "NameInEnglish":"",
      "NameInArabic":"",
      "BodyImage":"",
      "TailorNameInEnglish":"",
      "TailorNameInArabic":"",
      "AppoinmentDt": '',
      "AppointmentTime": '',
      'Status':'',
      "RejectDt": "",
    }
    this.getappointmentdata()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getappointmentdata(){
    var type=getString('type')
    if(type=='measurement'){
      
    this.imgUrl=this.api.imageurl+'Measurement1/'
    
      let orderdetailId=getNumber('detailId')
      let type='Buyer'
this.api.getappointmentMeasurement(orderdetailId,type).subscribe(res=>{
  console.log('res',res)
  var appointmentdata=res['Result'][0]
  if(appointmentdata){
    this.appointmentdata['BodyImage']=appointmentdata['BodyImage']
    this.appointmentdata['OrderId']=appointmentdata['OrderId']
    this.appointmentdata['DetailId']=appointmentdata['DetailId']
    this.appointmentdata['AppointmentId']=appointmentdata['AppointmentId']
    this.appointmentdata['OrderTypeId']=appointmentdata['OrderTypeId']
    this.appointmentdata['TailorNameInEnglish']=appointmentdata['TailorNameInEnglish']
    this.appointmentdata['TailorNameInArabic']=appointmentdata['TailorNameInArabic']
    this.appointmentdata['NameInEnglish']=appointmentdata['NameInEnglish']
    this.appointmentdata['NameInArabic']=appointmentdata['NameInArabic']
    this.appointmentdata['Status']=appointmentdata['Status']
    this.appointmentdata['AppoinmentDt']=appointmentdata['AppoinmentDt']
    this.appointmentdata['AppointmentTime']=appointmentdata['AppointmentTime']
    this.appointmentdata['RejectDt']=appointmentdata['RejectDt']
  }
})
    }else{
      this.imgUrl=this.api.imageurl+'OrderType/'
      // let orderdetailId=7
      let orderdetailId=getNumber('detailId')
      let type='Buyer'
this.api.getappointmentMaterial(orderdetailId,type).subscribe(res=>{
  console.log('matres',res)
  var appointmentdata=res['Result'][0]
  if(appointmentdata){
    this.appointmentdata['BodyImage']=appointmentdata['BodyImage']
    this.appointmentdata['OrderId']=appointmentdata['OrderId']
    this.appointmentdata['DetailId']=appointmentdata['DetailId']
    this.appointmentdata['AppointmentId']=appointmentdata['AppointmentId']
    this.appointmentdata['OrderTypeId']=appointmentdata['OrderTypeId']
    this.appointmentdata['TailorNameInEnglish']=appointmentdata['TailorNameInEnglish']
    this.appointmentdata['TailorNameInArabic']=appointmentdata['TailorNameInArabic']
    this.appointmentdata['NameInEnglish']=appointmentdata['NameInEnglish']
    this.appointmentdata['NameInArabic']=appointmentdata['NameInArabic']
    this.appointmentdata['Status']=appointmentdata['Status']
    this.appointmentdata['AppoinmentDt']=appointmentdata['AppoinmentDt']
    this.appointmentdata['AppointmentTime']=appointmentdata['AppointmentTime']
    this.appointmentdata['RejectDt']=appointmentdata['RejectDt']
  }
})
    }
  }
  reasontxt(event){
this.rejectedReason=event.value
  }
  approveRejectAppointment(val){
if(val==2){
this.rejecttxt=true
if(this.rejectedReason != null){

  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context:{ alerttxt: "Are you sure want to Proceed!",alerttxtae:'هل تريد المتابعة؟' }
  };
  this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
    console.log('rerrr', res);
    setTimeout(() => {
      var type=getString('type')
      if(type=='measurement'){
  let temp={
    "AppointmentId":this.appointmentdata['AppointmentId'],
  "IsApproved":val,
  "Reason":this.rejectedReason,
  }
  console.log('tem',temp)
  this.api.approverejectMeasurement(temp).subscribe(res=>{
    console.log('res',res)
    if(res["ResponseMsg"]== "Success"){
      this.showtoast('Appointed updated successfully.')
      this.router.navigate(['/PendingOrderDetailsComponent'])
    }else{
      
      this.showtoast('error while processing')
    }
    
  },err=>{  
    console.log("err",err)  
    if(this.lang=='English'){
      this.showtoast('Error While Updating') 
      }else{
        this.showtoast('حدث خطأ أثناء التحديث') 
      }
  })
      }else{
        let temp={
          "AppointmentId":this.appointmentdata['AppointmentId'],
        "IsApproved":val,
        "Reason":this.rejectedReason,
        }
        console.log('tem',temp)
        this.api.approverejectMaterial(temp).subscribe(res=>{
          console.log('matres',res)
          if(res["ResponseMsg"]== "Success"){
            this.showtoast('Appointed updated successfully.')
            this.router.navigate(['/PendingOrderDetailsComponent'])
          }else{
            
            this.showtoast('error while processing')
          }
        },err=>{
          if(this.lang=='English'){
            this.showtoast('Error While Updating') 
            }else{
              this.showtoast('حدث خطأ أثناء التحديث') 
            }
        })
      }
    })
  })
}else{
  if(this.lang=='English'){
    this.showtoast('please enter reason for rejection! ')
    }else{
      this.showtoast('الرجاء إدخال سبب الرفض')
    }
}

}else{

  this.rejecttxt=false
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context:{ alerttxt: "Are you sure want to Proceed!",alerttxtae:'هل تريد المتابعة؟' }
  };
  this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
    console.log('rerrr', res);
    setTimeout(() => {
      var type=getString('type')
      if(type=='measurement'){
  let temp={
    "AppointmentId":this.appointmentdata['AppointmentId'],
  "IsApproved":val,
  "Reason":this.rejectedReason,
  }
  console.log('tem',temp)
  this.api.approverejectMeasurement(temp).subscribe(res=>{
    console.log('res',res)
    if(res["ResponseMsg"]== "Success"){
      this.showtoast('Appointed updated successfully.')
      this.router.navigate(['/PendingOrderDetailsComponent'])
    }else{
      
      this.showtoast('error while processing')
    }
    
  },err=>{  
    console.log("err",err)  
    if(this.lang=='English'){
      this.showtoast('Error While Updating') 
      }else{
        this.showtoast('حدث خطأ أثناء التحديث') 
      }
  })
      }else{
        let temp={
          "AppointmentId":this.appointmentdata['AppointmentId'],
        "IsApproved":val,
        "Reason":this.rejectedReason,
        }
        console.log('tem',temp)
        this.api.approverejectMaterial(temp).subscribe(res=>{
          console.log('matres',res)
          if(res["ResponseMsg"]== "Success"){
            this.showtoast('Appointed updated successfully.')
            this.router.navigate(['/PendingOrderDetailsComponent'])
          }else{
            
            this.showtoast('error while processing')
          }
        },err=>{
          if(this.lang=='English'){
            this.showtoast('Error While Updating') 
            }else{
              this.showtoast('حدث خطأ أثناء التحديث') 
            }
        })
      }
    })
  })

}
 

  }
  showtoast(val){
    const toast = new Toasty({ text: val});
    toast.textColor = '#fff';
    toast.backgroundColor ='gray';
    toast.position=ToastPosition.CENTER
     toast.show();
  }
  goBack(){
    this.router.navigate(['/PendingOrderDetailsComponent'])
  } 
}
