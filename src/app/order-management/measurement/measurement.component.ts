import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { NameModalComponent } from './name-modal/name-modal.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {
  lang='English'
  aedata;
measurement;
  imgUrl: string;
  measurementdata;
  ordertypeId: number;
  addmeasurement: boolean;
  MeasurementTypeId: number;
  partsshow: boolean;
  measurementListtoUpdate: any;
  imageurlstitching: string;
  selecteddressId: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.imageurlstitching=this.api.imageurl+"DressSubType/"
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    
    this.ordertypeId=getNumber('ordertypeId')
    this.MeasurementTypeId=getNumber('MeasurementTypeId')
    
 
    
    if(getNumber('MeasurementId') == 0){
      this.addmeasurement=true
      this.partsshow=false
      this.getmeasurementListtoUpdate()
    }else{
      this.addmeasurement=false
      this.partsshow=true
    }
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
  getmeasurementListtoUpdate(){
    let DressTypeId=getNumber('DressSubTypeId')
    let userId=getNumber('SellerId')
    var TailorId=getNumber("userId")
    // let DressTypeId=110
    // let userId=1741
    // var TailorId=440
    this.api.getmeasurementListtoUpdate(DressTypeId,userId,TailorId).subscribe(res=>{
      console.log('tttt',res)
      this.measurementListtoUpdate=res['Result']
    })
  }
  selecttoupdate(id){
    this.selecteddressId=id
  }
  UpdateMeasurement(){
    let detailId=getNumber('detailId')
    let temp={
      "OrderId":detailId,
"MeasurementId":this.selecteddressId
    }
    this.api.updateMeasurementId(temp).subscribe(res=>{
      console.log('res',res)
      if(res['Result']==1){
        if(this.lang=='English'){
          this.api.showtoast('Sucessfully Added')
        }else{
          this.api.showtoast('تم الإضافة بنجاح')
        }
        this.router.navigate(['/PendingOrderDetailsComponent'])
      }else{
        
        this.api.showtoast('Error!')
      }
    })
  }
  gotoAddMeasurement(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {'dressName':getString('dressName')}
  };
  this.modalService.showModal(NameModalComponent, options).then(res => {
console.log('res',res)
setTimeout(() => {
if(res != undefined){ 
  setString('measureName',res)
  this.router.navigate(['/MeasurementPageComponent'])
}
}, 500);
  })
  }
  goBack(){
    this.router.back()
  } 
}
