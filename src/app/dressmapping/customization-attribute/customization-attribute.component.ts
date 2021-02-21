import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import 'nativescript-localstorage';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { CustzoomModalComponent } from '../custzoom-modal/custzoom-modal.component';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-customization-attribute',
  templateUrl: './customization-attribute.component.html',
  styleUrls: ['./customization-attribute.component.css']
})
export class CustomizationAttributeComponent implements OnInit {
  lang='English'
  aedata;
  imageurl: string;
  attributearray: any;
  slectedarray: any;
  dresssubtypeId: any;
  selectedattrId: any;
  retrievedObject: string;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,private viewContainerRef: ViewContainerRef,private modalService: ModalDialogService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.slectedarray=[]
   this.retrievedObject =JSON.parse(localStorage.getItem('selectedattr'));
   console.log('restriveobjetc',this.retrievedObject)
   if(this.retrievedObject){
    this.slectedarray=this.retrievedObject
   }else{

    this.slectedarray=[]
   }
    this.imageurl=this.api.imageurl+'Customazation3/'
    this.params.queryParams.subscribe(res=>{
      this.dresssubtypeId=res['dressSubTypeID']
      this.getcustomisationAttribute(res['AttributeId'],res['dressSubTypeID'])
    })
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getcustomisationAttribute(AttributeId,dressSubTypeID){
    
    var TailorId=getNumber("userId")
    this.api.getcustomisationAttributes(AttributeId,TailorId,dressSubTypeID).subscribe(res=>{
      console.log('att',res)
      this.attributearray=res['Result']
      if(this.attributearray){
        this.attributearray.map((x,i)=>{
          if(x['Switch'] == true){
            this.slectedarray.push({'CustomizationAttributeId':x['CustomizationAttributeId'],'AttributeImageId':x['Id'],"Switch": true})
          }
        })
      };
      console.log('this.slectedarray',this.slectedarray)
      if(this.slectedarray.length != 0){
        this.attributearray.map((x,i)=>{
          this.slectedarray.map((y,j)=>{
            if(x['Id'] == y['AttributeImageId']){
              this.attributearray[i]['Switch']=true
            }
          })
        })
      }
    })
  }
  getattribute(checkvalcompany,Id,CustomizationAttrId){
if(checkvalcompany == 'false'){
  this.attributearray.map((x,i)=>{
    if(x['Id'] == Id){
      this.attributearray[i]['Switch']=true
        this.slectedarray.push({'CustomizationAttributeId':CustomizationAttrId,'AttributeImageId':Id,"Switch": true})
    }
  })
  
  console.log('this.check',this.slectedarray)
}else if(checkvalcompany == 'true'){
  this.attributearray.map((x,i)=>{
    if(x['Id'] == Id){
      this.attributearray[i]['Switch']=false
      this.slectedarray = this.slectedarray.filter(e => e['AttributeImageId'] !== Id )
    }
  })
  
  console.log('this.uncheck',this.slectedarray)
}
 
localStorage.setItem('selectedattr', JSON.stringify(this.slectedarray));
}
goBack(){
  localStorage.setItem('selectedattr', JSON.stringify(this.slectedarray));
  // this.router.navigate(['/DressDetailComponent'],{queryParams:{'subtypeId':this.dresssubtypeId}})
  this.router.back()
}
openzoomImg(img){
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context: {zoomImg:img}
};
this.modalService.showModal(CustzoomModalComponent, options).then(res => {
});
}
}
