import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from "tns-core-modules/ui/page";
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { MeasureModalComponent } from '../measure-modal/measure-modal.component';
import {ObservableArray} from 'tns-core-modules/data/observable-array'
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-measurement-page',
  templateUrl: './measurement-page.component.html',
  styleUrls: ['./measurement-page.component.css']
})
export class MeasurementPageComponent implements OnInit {
  lang='English'
  aedata;
  items;
  selectedheaders: string;
  partsImg: any;
  currentPagerIndex=0
  imgUrl: string;
  Measurements: any;
  selectedmeasure;
  mapmeasurId=[{'Id':1},{'Id':2},{'Id':3},{'Id':4},{'Id':5}]
  dresstypeId: number;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }
  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgUrl=this.api.imageurl+'Measurement2/'
    this.items=[]
    this.selectedmeasure=[]
    this.selectedheader('0') 
    this.getMeasurementParts()
 
  }

  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  onIndexChanged(e: { value: number; }){
    console.log('event',e.value) 
    setTimeout(() => {
      this.currentPagerIndex=e.value
  }, 10);
  }
  getMeasurementParts(){
    // this.dresstypeId=110
    // this.dresstypeId=52
    this.dresstypeId=getNumber('DressSubTypeId')
   console.log('iiid',getNumber('DressSubTypeId'))
    
    this.api.getMeasurementparts(this.dresstypeId).subscribe(res=>{
      this.Measurements=res['Result']['Measurements']
let partsimg=res['Result']['Image']
if(partsimg){
  partsimg.map(x=>{
    var Image=this.api.imageurl+"Measurement2/"+x['Image']
    this.items.push({Image})
  })
}
    })
  }
  selectedheader(val){
    if(val=='0'){
      this.selectedheaders='0'
    }else if(val=='1'){
      this.selectedheaders='1'
    }
    } 

    openmeasurementmodal(data){
      // console.log('iid',id)
      const options: ModalDialogOptions = {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        ios: {
          presentationStyle: UIModalPresentationStyle.OverFullScreen
        },
        context: {'data':data}
    };
    this.modalService.showModal(MeasureModalComponent, options).then(res => {
      console.log('rerrr',res);
      this.Measurements.map((x,i)=>{
        if(x['Id']==res['Id']){
          this.Measurements[i]['Value']=res['value']
          this.selectedmeasure.push({'MeasurementId':res['Id'],'Value':res['value']})
        }
      })
      console.log('ress', this.selectedmeasure)
    });
    }
  goBack(){
    this.router.back()
  }
  insertNewMeasurement(){
    if(this.Measurements.length == this.selectedmeasure.length){
      console.log('hi',this.selectedmeasure.length)
          const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context:{ alerttxt: "Are you sure want to Proceed!",alerttxtae:'هل تريد المتابعة؟' }
    };
    this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
      console.log('rerrr', res);
      setTimeout(() => {
        var TailorId=getNumber("userId")
        let userId= getNumber('userIdformeasure')
        let measureName= getString('measureName')
        let temp={
          "UserId":userId,
    "DressTypeId":this.dresstypeId,
    "MeasurementValue":this.selectedmeasure,
    "Units":"cm",
    "CreatedBy":TailorId,
    "MeasurementBy":"tailor",
    "Name":measureName,
        }
        console.log('res',temp)
        this.api.insertnewMeasurement(temp).subscribe(res=>{
          console.log('res',res)
          if(res['ResponseMsg']== "Success"){
            this.updateMeasurementId(res['Result'])
this.showtoast(res['Result'])
          }else{
            if(this.lang=='English'){
              this.showtoast('Error While Updating') 
              }else{
                this.showtoast('حدث خطأ أثناء التحديث') 
              }
          }
        },err=>{
          
          if(this.lang=='English'){
            this.showtoast('Error While Updating') 
            }else{
              this.showtoast('حدث خطأ أثناء التحديث') 
            }
        })
      },200)
    })
    }else{
      console.log('hi',this.selectedmeasure.length)
      if(this.lang=='English'){
        this.showtoast('Select All Measurements !')
      }else{
        this.showtoast('الرجاء إختاير كل المقاسات')
      }
    }

  
  }
  updateMeasurementId(measurementId){
    let detailId=getNumber('detailId')
    let temp={
      "OrderId":detailId,
"MeasurementId":measurementId
    }
    this.api.updateMeasurementId(temp).subscribe(res=>{
      console.log('res',res)
      if(res['Result']==1){
        if(this.lang=='English'){
          this.showtoast('Sucessfully Added')
        }else{
          this.showtoast('تم الإضافة بنجاح')
        }
        this.router.navigate(['/PendingOrderDetailsComponent'])
      }else{
        
        this.showtoast('Error!')
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
}
