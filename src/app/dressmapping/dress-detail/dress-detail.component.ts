import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";

import { Toasty, ToastPosition } from 'nativescript-toasty';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { NoOfDaysmodalComponent } from '~/app/common/no-of-daysmodal/no-of-daysmodal.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-dress-detail',
  templateUrl: './dress-detail.component.html',
  styleUrls: ['./dress-detail.component.css']
})
export class DressDetailComponent implements OnInit {
  lang='English'
  aedata;
  GetTailorCustomization: any;
  StichingChargesarr;
  checkimg='~/assets/dashbord/Unchecked.png'
  checkval='false'
  istitchdress: boolean=false;
  checked:boolean=false
  dressSubTypeID: any;
  retrievedObject: any;
  materaialChargesArray: any;
  materialcahrges;
  mappedcustomization: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,
    private modalService: ModalDialogService,private viewContainerRef: ViewContainerRef,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.materialcahrges=[]
    this.StichingChargesarr={
      "StichingCharges": "",
     "NoOfDays": "",
     "Express": ""
    }
    // this.imageurl=this.api.imageurl+'DressSubType/'
    // this.params.queryParams.subscribe(res=>{
    //   this.getcustomisation(res['subtypeId'])
    //   this.dressSubTypeID= getNumber('subdressdressId')
    
    // })
    
    this.dressSubTypeID= getNumber('subdressdressId')
    this.getcustomisation()
    this.getcustomizationformapped()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getcustomisation(){
    var TailorId=getNumber("userId")
this.api.getcustomisationfordress(TailorId,this.dressSubTypeID).subscribe(res=>{
  console.log('res',res['Result']['StichingCharges'])
  this.GetTailorCustomization=res['Result']['GetTailorCustomization']
  if(res['Result']['StichingCharges'].length != 0 ){
    this.StichingChargesarr['StichingCharges']=res['Result']['StichingCharges'][0]['StichingCharges']
    this.StichingChargesarr['NoOfDays']=res['Result']['StichingCharges'][0]['NoOfDays']
    this.StichingChargesarr['Express']=res['Result']['StichingCharges'][0]['Express']

    if(res['Result']['StichingCharges'][0]['Express'] == true || res['Result']['StichingCharges'][0]['Switch'] == true){
      this.checkval='true'
      this.checkimg='~/assets/dashbord/Check box.png'
      this.istitchdress=true
      this.checked=true
    }else{
      this.checkval='false'
      this.checkimg='~/assets/dashbord/Unchecked.png'
      this.istitchdress=false
      this.checked=false
  
    }
  }
  this.materaialChargesArray=res['Result']["GetMaterial"]
  this.materaialChargesArray.map((y,i)=>{
this.materialcahrges.push({'MaterialId':y['Id'],'MaterialCharges':y['MaterialCharges']})
  })
  
})
  }
  getcustomizationformapped(){
    var TailorId=getNumber("userId")
    this.api.getcustomiztaionformapped(TailorId,this.dressSubTypeID).subscribe(res=>{
    this.mappedcustomization=res['Result']
    })
  }
  istitch(val){
if(val == true){
  this.istitchdress=true
  this.checked=true
}else{
  
  this.istitchdress=false
  this.checked=false
}
  }
  getexpressval(checkval){
    if(checkval == 'false'){
      this.checkval='true'
      this.checkimg='~/assets/dashbord/Check box.png'
    }else if(checkval == 'true'){
      this.checkval='false'
      this.checkimg='~/assets/dashbord/Unchecked.png'
    }
  }

  opennoofdaysmodal(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
  };
  this.modalService.showModal(NoOfDaysmodalComponent, options).then(res => {
    console.log('country',res); 
    this.StichingChargesarr['NoOfDays']=res['No']
  });
}
getmatcharges(matchrg,Id){
console.log('charges',matchrg.value,Id)
this.materialcahrges.map((x,i)=>{
  if(x['MaterialId']==Id){
    this.materialcahrges[i]['MaterialCharges']=matchrg.value
  }
})
console.log('this.materialcahrges',this.materialcahrges)
}
insertDressSkill(){
  if(this.checkval == 'true'){
    var delivery=1
  }else{
    var delivery=0
  }
  var TailorId=getNumber("userId")
  this.retrievedObject =JSON.parse(localStorage.getItem('selectedattr'));
  if( this.retrievedObject != null && this.retrievedObject.length !=0 ){
    this.retrievedObject
  }else{
    this.retrievedObject=this.mappedcustomization
  }
  let temp={
    "TailorId":TailorId,
"DressSubTypeId":this.dressSubTypeID,
"StichingCharges": this.StichingChargesarr['StichingCharges'],
"OrderCustomization":this.retrievedObject,
"Materials":this.materialcahrges,
"NoOfDays": this.StichingChargesarr['NoOfDays'],
"Delivery":delivery
  }
  console.log('temptemp',temp)
  console.log('this.retrievedObject',this.retrievedObject)
  if( this.retrievedObject != null && this.retrievedObject.length !=0){

    this.api.insertdressSkill(temp).subscribe(res=>{
      console.log('res',res)
      if(res['Result'] == '1'){
        this.router.navigate(['/DressTypeComponent'])
        localStorage.removeItem('selectedattr')
      }else{

        this.api.showtoast('Error !')
      }
    },err=>{
      if(err){
        this.api.showtoast('Error !')
      }
    })
  }else{
if(this.lang=='English'){
  this.api.showtoast('Please Select Customization !')
}else{
  this.api.showtoast('الرجاء إختيار التعديل أو الإضافة')
}
  }
}
showtoast(val){
  const toast = new Toasty({ text: val});
  toast.textColor = '#fff';
  toast.backgroundColor ='gray';
  toast.position=ToastPosition.CENTER
   toast.show();
}
gotoAttribute(AttributeId){
  this.router.navigate(['/CustomizationAttributeComponent'],{queryParams:{'AttributeId':AttributeId,'dressSubTypeID':this.dressSubTypeID}})
}
  goBack(){
    this.router.navigate(['/DressSubTypeComponent'])
  }
}
