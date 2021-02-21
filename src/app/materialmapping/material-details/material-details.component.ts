import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { registerElement } from 'nativescript-angular/element-registry';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
registerElement("Carousel", () => require("nativescript-carousel").Carousel);
registerElement("CarouselItem", () => require("nativescript-carousel").CarouselItem);
@Component({
  selector: 'ns-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit { 
  lang='English'  
  aedata;
   @ViewChild("CB1",{static:true}) FirstCheckBox: ElementRef;
   checkval='false'
   checkimg='~/assets/dashbord/Unchecked.png'
  myData;
  frndName: boolean;
  materialId: any;
  friendlyarbic: any;
  friendlyeng: any;
  imageurl: string;
  Thicknesseng: any;
  getMaterialName: any;
  getPattern: any;
  getColors: any;
  materialcherges;
  chargesarray: any[];
  friendlyName;
  constructor(public router:RouterExtensions,public params:ActivatedRoute,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
   this.getPattern={
      "PatternInEnglish": "",
     "PatternInArabic": "",
     "PlaceInEnglish": "",
     "PlaceInArabic": "",
     "BrandInEnglish": "",
     "BrandInArabic": "",
     "MaterialInEnglish": "",
     "MaterialInArabic": ""
    }
    this.friendlyName={
      "FriendlyNameInEnglish": "",
      "FriendlyNameInArabic": ""
    }
    this.chargesarray=[]
    this.imageurl=this.api.imageurl+'Pattern/'
    // this.params.queryParams.subscribe(res=>{
    //   console.log('res',res)
    //   if(res['materialId']){
    //     this.materialId=res['materialId']
    //     this.getMaterialDetails(this.materialId)
    //     this.getMaterialDetailscharges(this.materialId)
    //   }
    // })
    
    this.materialId=getNumber('materialId')
         this.getMaterialDetails(this.materialId)
        this.getMaterialDetailscharges(this.materialId)
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getMaterialDetails(materialId){
   var TailorId=getNumber("userId")
  this.api.GetMaterialDeatils(TailorId,materialId).subscribe(res=>{
    console.log('res',res)
    this.myData=res['Result']['PatternImg']
    this.Thicknesseng=res['Result']['GetThickness']
    this.getMaterialName=res['Result']['GetMaterialName']
    if(this.getMaterialName.length != 0){
      this.checkval='true'
      this.checkimg='~/assets/dashbord/Check box.png'
      this.frndName=true
      this.friendlyName['FriendlyNameInEnglish']=res['Result']['GetMaterialName'][0]['FriendlyNameInEnglish']
      this.friendlyName['FriendlyNameInArabic']=res['Result']['GetMaterialName'][0]['FriendlyNameInArabic']
    }else{
      this.checkval='false'
      this.checkimg='~/assets/dashbord/Unchecked.png'
      this.frndName=false
    }
    if(res['Result']['GetPattern'].length !=0){
    this.getPattern['PatternInEnglish']=res['Result']['GetPattern'][0]['PatternInEnglish']
    this.getPattern['PatternInArabic']=res['Result']['GetPattern'][0]['PatternInArabic']
    this.getPattern['PlaceInEnglish']=res['Result']['GetPattern'][0]['PlaceInEnglish']
    this.getPattern['PlaceInArabic']=res['Result']['GetPattern'][0]['PlaceInArabic']
    this.getPattern['BrandInEnglish']=res['Result']['GetPattern'][0]['BrandInEnglish']
    this.getPattern['BrandInArabic']=res['Result']['GetPattern'][0]['BrandInArabic']
    this.getPattern['MaterialInEnglish']=res['Result']['GetPattern'][0]['MaterialInEnglish']
    this.getPattern['MaterialInArabic']=res['Result']['GetPattern'][0]['MaterialInArabic']
  }
    if(res['Result']['GetColors'].length !=0){
      this.getColors=res['Result']['GetColors']
      console.log('color',this.getColors)
    }
  })
}

getMaterialDetailscharges(materialId){
   var TailorId=getNumber("userId")
  this.api.GetMaterialDeatilscharges(TailorId,materialId).subscribe(res=>{
    console.log('charges',res)
    this.materialcherges=res['Result']

  })
}

getmaterial(val){
console.log('vall',val)
if(val == 'false'){
  this.checkval='true'
  this.checkimg='~/assets/dashbord/Check box.png'
  this.frndName=true
}else if(val == 'true'){
  this.checkval='false'
  this.checkimg='~/assets/dashbord/Unchecked.png'
  this.frndName=false
}
}
frndlyNameeng(nameeng){

  this.friendlyeng=nameeng.value
}
frndlyNamearb(namearb){
  this.friendlyarbic=namearb.value
}
getCharges(name,Id){
this.chargesarray=[{'Id':Id,'MaterialCharges':name.value}]
console.log("values",this.chargesarray)
}
mapMaterialSave(){
let temp={
  "TailorId":getNumber("userId"),
'MaterialId':  this.materialId,
'FriendlyNameInEnglish':  this.friendlyName['FriendlyNameInEnglish'],
'FriendlyNameInArabic':  this.friendlyName['FriendlyNameInArabic'],
'DressSubTypeId':this.chargesarray
}

console.log('temp',temp)
if( this.friendlyName['FriendlyNameInEnglish'] &&  this.friendlyName['FriendlyNameInArabic']){
  this.api.insertMaterialMapping(temp).subscribe(res=>{
    console.log('res',res)
    if(res["Result"] == "1"){
      this.router.navigate(['/material'],{queryParams:{'pageid':'materialdetail'}})  
    }
  
  })
}else{
  if(this.lang=='English'){
    this.showtoast("Please Enetr Friendly Name !")
  }else{
    this.showtoast("الرجاء إدخال الاسم المتعارف عليه")
  }
}

}
  goBack(){
    this.router.back()
  }
  showtoast(val){
    const toast = new Toasty({ text: val});
    toast.textColor = '#fff';
    toast.backgroundColor ='gray';
    toast.position=ToastPosition.CENTER
     toast.show();
  }
}
