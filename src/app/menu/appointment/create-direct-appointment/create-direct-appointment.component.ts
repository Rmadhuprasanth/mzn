import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { DatePipe } from '@angular/common';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { TimeModalComponent } from '~/app/order-management/time-modal/time-modal.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-create-direct-appointment',
  templateUrl: './create-direct-appointment.component.html',
  styleUrls: ['./create-direct-appointment.component.css']
})
export class CreateDirectAppointmentComponent implements OnInit {
  lang='English'
  aedata;
  selectedheaders: string;
  appointmentdatameasure;
  appointmentdatamaterial;
  imgUrl: string;
  selecteddate=null;
  selecteddatematerial=null;
  minDate: Date = new Date();
  maxDate: Date = new Date(2045, 4, 12);
  showdategrid='false'
  dateshow: boolean;
  showdategridmaterial='false'
  dateshowmaterial: boolean;
  selectedTimemeasure=null;
  imgUrlmaterial: string;
  selectedTimematerial=null;
  orderId: number;
  OrderTypeId: number;
  MeasurementTypeId: number;
  createmeasure: boolean;
  Approvemeasure: boolean;
  noappointment: boolean;
  ApproveMaterial: boolean;
  createMaterial: boolean;
  noappointmentmaterial: boolean;
  rejectedReason: any;
  rejecttxt: boolean;
  showmatheader: boolean;
  showmeasuretheader: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private datePipe: DatePipe,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.selectedheader('0')
    this.orderId=getNumber('orderId')
    this.OrderTypeId=getNumber('OrderTypeId')
    this.MeasurementTypeId=getNumber('MeasurementTypeId')

    if(this.MeasurementTypeId){
      if(this.MeasurementTypeId == 2){
        this.getappointmentdataformeasure()
        this.Approvemeasure=false
        this.createmeasure=true
        this.noappointment=false
      }else if(this.MeasurementTypeId == 3){
        this.getappointmentdataformeasure()
        this.Approvemeasure=true
        this.createmeasure=false
        this.noappointment=false
      }else{
        this.Approvemeasure=false
        this.createmeasure=false
        this.noappointment=true
      }
    }

if(this.OrderTypeId){
  if(this.OrderTypeId == 1){
    this.getappointmentdataforMaterial()
    this.ApproveMaterial=false
    this.createMaterial=true
    this.noappointmentmaterial=false
  }else if(this.OrderTypeId == 2){
    this.getappointmentdataforMaterial()
    this.ApproveMaterial=true
    this.createMaterial=false
    this.noappointmentmaterial=false
  }else{
    this.ApproveMaterial=false
    this.createMaterial=false
    this.noappointmentmaterial=true
  }
};

    this.appointmentdatameasure={
      "OrderId":"",
      "DetailId":"",
      "AppointmentId":"",
      "OrderTypeId":"",
      "NameInEnglish":"",
      "NameInArabic":"",
      "BodyImage":"",
      "TailorNameInEnglish":"",
      "TailorNameInArabic":"",
      'Status':'',
      'AppoinmentDt':'',
      'AppointmentTime':'',
      'RejectDt':'',
    }
    this.appointmentdatamaterial={
      "OrderId":"",
      "DetailId":"",
      "AppointmentId":"",
      "OrderTypeId":"",
      "NameInEnglish":"",
      "NameInArabic":"",
      "BodyImage":"",
      "TailorNameInEnglish":"",
      "TailorNameInArabic":"",
      'Status':'',
      'AppoinmentDt':'',
      'AppointmentTime':'',
      'RejectDt':'',
    }

    console.log("this.MeasurementTypeId " ,this.MeasurementTypeId);
    console.log("this.OrderTypeId" ,this.OrderTypeId);
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  selectedheader(val){
    if(val=='0'){
      this.selectedheaders='0'
    }else if(val=='1'){
      this.selectedheaders='1'
    }
    } 

    dateclickmeasure(showdategrid){
      if(showdategrid == 'false'){
        this.showdategrid='true'
        this.dateshow=true
      }else{
        this.showdategrid='false'
        this.dateshow=false
      }
        }
     
        onDateChangedmeasure(args) {
          console.log("Date New value: " + args.value);
          this.selecteddate=this.datePipe.transform(args.value)
      }
   
      
      openTimemeasure(){
        const options: ModalDialogOptions = {
          viewContainerRef: this.viewContainerRef,
          fullscreen: false,
          context: {}
      };
      this.modalService.showModal(TimeModalComponent, options).then(res => {
        console.log('rerrr',res);
        this.selectedTimemeasure=res
      });
      }


    getappointmentdataformeasure(){
        let orderdetailId=this.orderId
        let type='Buyer'
    this.api.getappointmentMeasurement(orderdetailId,type).subscribe(res=>{
      this.imgUrl=this.api.imageurl+'Measurement1/'
    console.log('measure',res)
    var appointmentdata=res['Result'][0]
    if(appointmentdata){
      this.appointmentdatameasure['BodyImage']=appointmentdata['BodyImage']
      this.appointmentdatameasure['OrderId']=appointmentdata['OrderId']
      this.appointmentdatameasure['DetailId']=appointmentdata['DetailId']
      this.appointmentdatameasure['AppointmentId']=appointmentdata['AppointmentId']
      this.appointmentdatameasure['OrderTypeId']=appointmentdata['OrderTypeId']
      this.appointmentdatameasure['TailorNameInEnglish']=appointmentdata['TailorNameInEnglish']
      this.appointmentdatameasure['TailorNameInArabic']=appointmentdata['TailorNameInArabic']
      this.appointmentdatameasure['NameInEnglish']=appointmentdata['NameInEnglish']
      this.appointmentdatameasure['NameInArabic']=appointmentdata['NameInArabic']
      this.appointmentdatameasure['Status']=appointmentdata['Status']
      this.appointmentdatameasure['AppoinmentDt']=appointmentdata['AppoinmentDt']
      this.selecteddate=appointmentdata['AppoinmentDt']
      this.appointmentdatameasure['AppointmentTime']=appointmentdata['AppointmentTime']
      this.selectedTimemeasure=appointmentdata['AppointmentTime']
      this.appointmentdatameasure['RejectDt']=appointmentdata['RejectDt']
     
    };
    if(this.MeasurementTypeId == 3 || this.MeasurementTypeId  == 2){
      if(appointmentdata){
        this.showmeasuretheader=true
        this.selectedheaders='0'
      }
    }else{
      this.showmeasuretheader=false
      this.selectedheaders='0'
    };
    
    })
      
    }
// <-----------------------material------------------------>

    getappointmentdataforMaterial(){
      let orderdetailId=this.orderId
      let type='Buyer'
  this.api.getappointmentMaterial(orderdetailId,type).subscribe(res=>{
    
    this.imgUrlmaterial=this.api.imageurl+'OrderType/'
  console.log('material',res)
  var appointmentdata=res['Result'][0]
  if(appointmentdata){
    this.appointmentdatamaterial['BodyImage']=appointmentdata['BodyImage']
    this.appointmentdatamaterial['OrderId']=appointmentdata['OrderId']
    this.appointmentdatamaterial['DetailId']=appointmentdata['DetailId']
    this.appointmentdatamaterial['AppointmentId']=appointmentdata['AppointmentId']
    this.appointmentdatamaterial['OrderTypeId']=appointmentdata['OrderTypeId']
    this.appointmentdatamaterial['TailorNameInEnglish']=appointmentdata['TailorNameInEnglish']
    this.appointmentdatamaterial['TailorNameInArabic']=appointmentdata['TailorNameInArabic']
    this.appointmentdatamaterial['NameInEnglish']=appointmentdata['NameInEnglish']
    this.appointmentdatamaterial['NameInArabic']=appointmentdata['NameInArabic']
    this.appointmentdatamaterial['Status']=appointmentdata['Status']
    this.appointmentdatamaterial['AppoinmentDt']=appointmentdata['AppoinmentDt']
    this.selecteddatematerial=appointmentdata['AppoinmentDt']
  this.appointmentdatamaterial['AppointmentTime']=appointmentdata['AppointmentTime']
  this.selectedTimematerial=appointmentdata['AppointmentTime']
  this.appointmentdatamaterial['RejectDt']=appointmentdata['RejectDt']
  };
  if(this.OrderTypeId == 1 || this.OrderTypeId  == 2){
    if(appointmentdata){
      this.showmatheader=true
      if(this.showmeasuretheader==true){
        this.selectedheaders='0'
      }else{
        this.selectedheaders='1'
      }
    }
  }else{
    this.showmatheader=false
    this.selectedheaders='1'
  };
  })
    
  }

  dateclickmaterial(showdategrid){
    if(showdategrid == 'false'){
      this.showdategridmaterial='true'
      this.dateshowmaterial=true
    }else{
      this.showdategridmaterial='false'
      this.dateshowmaterial=false
    }
  }
  onDateChangedmaterial(args) {
    console.log("Date New value: " + args.value);
    this.selecteddatematerial=this.datePipe.transform(args.value)
}

  openTimematerial(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
  };
  this.modalService.showModal(TimeModalComponent, options).then(res => {
    console.log('rerrr',res);
    this.selectedTimematerial=res
  });
  }


  // <-----------------------------create-appointMent--------------------------------------->
  cerateMeasurement(type){
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
        if(type =='measurement'){
          let temp={
            "OrderId": this.orderId,
        "AppointmentType":"2",
        "AppointmentTime":this.selectedTimemeasure,
        "From":this.selecteddate,
        "To":this.selecteddate,
        "Type":"tailor",
        "TypeId":TailorId,
        "CreatedBy":userName,
            }
            console.log('measure',temp)
            if(this.selecteddate==null){
              if(this.lang=='English'){
                this.showtoast('please select Date !')
              }else{
                this.showtoast('الرجاء إختيار التاريخ')
              }
            }else if(this.selectedTimemeasure==null){
              
              if(this.lang=='English'){
                this.showtoast('please select Time !')
              }else{
                this.showtoast('الرجاء إختيار الوقت')
              }
            }else{
              this.api.createnewAppointmentForMeasurement(temp).subscribe(res=>{
                console.log('res',res)
                if(res["ResponseMsg"]== "Success"){
                  if(this.lang=='English'){
                    this.showtoast('Appointment Created')
                  }else{
                    this.showtoast('تم إنشاء الموعد')
                  }
                  this.router.navigate(['/AppointmentListComponent'])
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
            "OrderId":this.orderId,
        "AppointmentType":"1",
        "AppointmentTime":this.selectedTimematerial,
        "From":this.selecteddatematerial,
        "To":this.selecteddatematerial,
        "Type":"tailor",
        "TypeId":TailorId,
        "CreatedBy":userName,
            }
            console.log('material',temp)
            if(this.selecteddatematerial==null){
              if(this.lang=='English'){
                this.showtoast('please select Date !')
              }else{
                this.showtoast('الرجاء إختيار التاريخ')
              }
            }else if(this.selectedTimematerial==null){
              
              if(this.lang=='English'){
                this.showtoast('please select Time !')
              }else{
                this.showtoast('الرجاء إختيار الوقت')
              }
            }else{
              this.api.createnewAppointmentForMaterial(temp).subscribe(res=>{
                console.log('res',res)
                if(res["ResponseMsg"]== "Success"){
                  if(this.lang=='English'){
                    this.showtoast('Appointment Created')
                  }else{
                    this.showtoast('تم إنشاء الموعد')
                  }
                  this.router.navigate(['/AppointmentListComponent'])
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
  cancel(){
    this.router.navigate(['/AppointmentListComponent'])
  }

  // <---------------------------approve-appointment-------------------------->
  reasontxt(event){
    this.rejectedReason=event.value
      }

      approveRejectAppointment(val,type){
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
              if(type=='measurement'){
          let temp={
            "AppointmentId":this.appointmentdatameasure['AppointmentId'],
          "IsApproved":val,
          "Reason":this.rejectedReason,
          }
          console.log('measure reje',temp)
          this.api.approverejectMeasurement(temp).subscribe(res=>{
            console.log('res',res)
            if(res["ResponseMsg"]== "Success"){
              if(this.lang=='English'){
                this.showtoast('Appointment Updated')
              }else{
                this.showtoast('تم تحديث الموعد')
              }
              this.router.navigate(['/AppointmentListComponent'])
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
                  "AppointmentId":this.appointmentdatamaterial['AppointmentId'],
                "IsApproved":val,
                "Reason":this.rejectedReason,
                }
                console.log('material rej',temp)
                this.api.approverejectMaterial(temp).subscribe(res=>{
                  console.log('matres',res)
                  if(res["ResponseMsg"]== "Success"){
                    if(this.lang=='English'){
                      this.showtoast('Appointment Updated')
                    }else{
                      this.showtoast('تم تحديث الموعد')
                    }
                    this.router.navigate(['/AppointmentListComponent'])
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
          this.showtoast('please eneter reason for rejection! ')
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
              if(type=='measurement'){
          let temp={
            "AppointmentId":this.appointmentdatameasure['AppointmentId'],
          "IsApproved":val,
          "Reason":this.rejectedReason,
          }
          console.log('measure aprove',temp)
          this.api.approverejectMeasurement(temp).subscribe(res=>{
            console.log('res',res)
            if(res["ResponseMsg"]== "Success"){
              if(this.lang=='English'){
                this.showtoast('Appointment Updated')
              }else{
                this.showtoast('تم تحديث الموعد')
              }
              this.router.navigate(['/AppointmentListComponent'])
            }else{
              
              this.showtoast('error while processing')
            }
            
          },err=>{  
            console.log("err",err)  
            this.showtoast('Error While Updating')
          })
              }else{
                let temp={
                  "AppointmentId":this.appointmentdatamaterial['AppointmentId'],
                "IsApproved":val,
                "Reason":this.rejectedReason,
                }
                console.log('material approve',temp)
                this.api.approverejectMaterial(temp).subscribe(res=>{
                  console.log('matres',res)
                  if(res["ResponseMsg"]== "Success"){
                    if(this.lang=='English'){
                      this.showtoast('Appointment Updated')
                    }else{
                      this.showtoast('تم تحديث الموعد')
                    }
                    this.router.navigate(['/AppointmentListComponent'])
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
    this.router.navigate(['/AppointmentListComponent'])
  }
}
