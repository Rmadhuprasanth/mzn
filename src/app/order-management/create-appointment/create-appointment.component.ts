import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { DatePipe } from '@angular/common';
import { TimeModalComponent } from '../time-modal/time-modal.component';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  lang='English'
  aedata;
  selecteddate=null;
  minDate: Date = new Date();
  maxDate: Date = new Date(2045, 4, 12);
  showdategrid='false'
  dateshow: boolean;
  selectedTime=null;
  appointmentdata: any;
  imgUrl: string;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private datePipe: DatePipe,private modalService: ModalDialogService,
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
      'Status':''
    }
    this.getappointmentdata()
    
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
  onDateChanged(args) {
    console.log("Date New value: " + args.value);
    this.selecteddate=this.datePipe.transform(args.value)
}

getappointmentdata(){
  var type=getString('type')
  if(type=='measurement'){
    
    let orderdetailId=getNumber('detailId')
    let type='Buyer'
this.api.getappointmentMeasurement(orderdetailId,type).subscribe(res=>{
  
  this.imgUrl=this.api.imageurl+'Measurement1/'
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
}
})
  }else{
    let orderdetailId=getNumber('detailId')
    let type='Buyer'
this.api.getappointmentMaterial(orderdetailId,type).subscribe(res=>{
  this.imgUrl=this.api.imageurl+'OrderType/'
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
}
})
  }
}

openTime(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
  };
  this.modalService.showModal(TimeModalComponent, options).then(res => {
    console.log('rerrr',res);
    this.selectedTime=res
  });
  }
  cerateMeasurement(){
    var detailId=getNumber('detailId')
    var userName=getString('userName')
    var TailorId=getNumber("userId")
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context:{ alerttxt: "Are you sure want to Proceed!",alerttxtae:'هل تريد المتابعة؟' }
    };
    this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
      console.log('rerrr', res);
      setTimeout(() => {
        var type=getString('type')
        if(type =='measurement'){
    
          let temp={
            "OrderId":detailId,
        "AppointmentType":"2",
        "AppointmentTime":this.selectedTime,
        "From":this.selecteddate,
        "To":this.selecteddate,
        "Type":"tailor",
        "TypeId":TailorId,
        "CreatedBy":userName,
            }
            console.log('temp',temp)
            if(this.selecteddate==null){
              if(this.lang=='English'){
                this.showtoast('please select Date !')
              }else{
                this.showtoast('الرجاء إختيار التاريخ')
              }
            }else if(this.selectedTime==null){
              
              if(this.lang=='English'){
                this.showtoast('please select Time !')
              }else{
                this.showtoast('الرجاء إختيار الوقت')
              }
            }else{
              this.api.createnewAppointmentForMeasurement(temp).subscribe(res=>{
                console.log('res',res)
                if(res["ResponseMsg"]== "Success"){
                  this.showtoast('appointed created successfully.')
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
          
        }else{
          
          let temp={
            "OrderId":detailId,
        "AppointmentType":"1",
        "AppointmentTime":this.selectedTime,
        "From":this.selecteddate,
        "To":this.selecteddate,
        "Type":"tailor",
        "TypeId":TailorId,
        "CreatedBy":userName,
            }
            console.log('temp',temp)
             if(this.selecteddate==null){
              if(this.lang=='English'){
                this.showtoast('please select Date !')
              }else{
                this.showtoast('الرجاء إختيار التاريخ')
              }
            }else if(this.selectedTime==null){
              
              if(this.lang=='English'){
                this.showtoast('please select Time !')
              }else{
                this.showtoast('الرجاء إختيار الوقت')
              }
            }else{
              this.api.createnewAppointmentForMaterial(temp).subscribe(res=>{
                console.log('res',res)
                if(res["ResponseMsg"]== "Success"){
                  this.showtoast('appointed created successfully.')
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
     
        }
      })
    })
  
  }
  showtoast(val){
    const toast = new Toasty({ text: val});
    toast.textColor = '#fff';
    toast.backgroundColor ='gray';
    toast.position=ToastPosition.CENTER
     toast.show();
  }
  cancel(){
    this.router.navigate(['/PendingOrderDetailsComponent'])
  }
  goBack(){
    this.router.navigate(['/PendingOrderDetailsComponent'])
  } 
}
