import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import { ModalDialogService,ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { DatePipe } from '@angular/common';
import { CustomeConfirmDaialogComponent } from '~/app/common/custome-confirm-daialog/custome-confirm-daialog.component';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { ActivatedRoute } from '@angular/router';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-promotion-home',
  templateUrl: './promotion-home.component.html',
  styleUrls: ['./promotion-home.component.css']
})
export class PromotionHomeComponent implements OnInit {
  lang='English'
  aedata;
  flatcheck=true
  discountcheck=false
  loader='false'
  bannerurl: string;
  bannnerId: number;
  bannerImage:string;
  stitchingorstore;
  applymodeval=2;
  textdata;
  selectedoffertype=1;
  startDate:boolean
  clickdatestart='false';
EndDate:boolean
 clickdateend='false'
  minstartDate: Date = new Date();
  maxstartDate: Date = new Date(2045, 4, 12);
  
  minendDate: Date = new Date();
  maxendDate: Date = new Date(2045, 4, 12);
  promoId: any;
  showsavebtn: boolean;
  showeditbtn: boolean;
  pageid: any;
  ifstitchhide: boolean=true;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page,private datePipe: DatePipe,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,public params:ActivatedRoute, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.stitchingorstore=getNumber('stitchingorstore')
    if(this.stitchingorstore==1){
      this.ifstitchhide=false
      this.applymodeval=1
    }else{
      this.ifstitchhide=true
      this.applymodeval=2
    }
    this.bannnerId=getNumber('bannerId')
    this.bannerurl=this.api.imageurl+'offer/'+getString('bannerimage')
    this.bannerImage=getString('bannerimage')
    this.textdata={
      "DiscountValue":null,
      "MinimumAmount": null,
"MaximumDiscount": null,
"ValidFrom": null,
"ValidTo": null,
"couponcodeId": null,
    }
  this.params.queryParams.subscribe(x=>{
    if(getNumber('promoId')){
      if(x['pageid']){
        this.pageid=x['pageid']
      }
this.getdataforEdit(getNumber('promoId'))
this.promoId=getNumber('promoId')
this.showsavebtn=false
this.showeditbtn=true
    }else{
      
this.showsavebtn=true
this.showeditbtn=false
this.promoId=0
    }
  })
    if(JSON.parse(localStorage.getItem('promodata'))){
      this.textdata=JSON.parse(localStorage.getItem('promodata'))
} 
 }
 getaedat(){
   this.aedata=this.aetext.getArabicConent()
 }
 showDatepickerstart(dateclick){
  if(dateclick == 'false'){
    this.startDate=true
    this.clickdatestart='true'
  }else{
    
    this.startDate=false
    this.clickdatestart='false'
  }
}
onstartDateChanged(args){
  let date=args.value
  this.textdata.ValidFrom= date.toISOString()

}

// <-------------end-on------------------>
showDatepickerend(dateclick){
  if(dateclick == 'false'){
    this.EndDate=true
    this.clickdateend='true'
  }else{
    
    this.EndDate=false
    this.clickdateend='false'
  }
}
onendDateChangend(args){
  let date=args.value
  this.textdata.ValidTo= date.toISOString()

}
  gotobannerList(){
    this.router.navigate(['/NewPromotionComponent'])
  }
  createNewBanner(){
    this.router.navigate(['/UploadPromotionComponent'])
  }
  gotostitchorstore(val){
    this.stitchingorstore=val
    
localStorage.setItem('promodata',JSON.stringify(this.textdata))
if(val==1){
  this.router.navigate(['/StitchingProdPromotionComponent'])
  setNumber('stitchingorstore',this.stitchingorstore)
  setNumber('stitchorstorefinal',this.stitchingorstore)
  this.ifstitchhide=false
  this.applymodeval=1
}else{
  this.router.navigate(['/StoreProdPromotionComponent'])
  setNumber('stitchingorstore',this.stitchingorstore)
  setNumber('stitchorstorefinal',4)
  this.ifstitchhide=true
  this.applymodeval=2
}
  }
  applymode(val){
this.applymodeval=val
  }
  offertype(val){
    this.selectedoffertype=val
  }

  // <--------------------------edit--------------------->
  
getdataforEdit(Id){
this.api.editPromotion(Id).subscribe(res=>{
  console.log("res",res)
  if(res){
    let data=res['Result'][0]
    this.bannerurl=this.api.imageurl+'offer/'+data["Image"]
    this.textdata['DiscountValue']=data["DiscountValue"]
    this.textdata['MinimumAmount']=data["MinimumAmount"]
    this.textdata['MaximumDiscount']=data["MaximumDiscount"]
    this.textdata['ValidFrom']=data["ValidFrom"]
    this.textdata['ValidTo']=data["ValidTo"]
    this.textdata['couponcodeId']=data["couponcodeId"]
    this.selectedoffertype=data["DiscountType"]
    this.applymodeval=data["CoupanRedemtionmethod"]
    setNumber('stitchorstorefinal',data["CouponAppliesTo"])
 
    setNumber('bannerId',data["imageId"])
    localStorage.setItem('CoupanType',data["CoupanType"])
    if( this.pageid){
      this.stitchingorstore=getNumber('stitchingorstore')
    }else{
      if(data["CouponAppliesTo"]){
        this.stitchingorstore=2
        setNumber('stitchingorstore',2)
           }else{
        this.stitchingorstore=1
        setNumber('stitchingorstore',1)
           }
    }
   
  }
})
}
// <--------------------------edit--------------------->
  savepromotion(){
    const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context:{ alerttxt: "Are you sure want to add New Promotion!", alerttxtae: "هل تريد إضافة عرض جديد؟" }
    };
    this.modalService.showModal(CustomeConfirmDaialogComponent, options).then(res => {
      setTimeout(() => {

          if(res == 'true'){
            if(this.applymodeval==2){
              this.textdata['couponcodeId']='automatic'
            }else{
              this.textdata['couponcodeId']
            }
            let data={
              'id':this.promoId,
              "couponcodeId": this.textdata['couponcodeId'],
        "DiscountValue": this.textdata['DiscountValue'],
        "DiscountType": this.selectedoffertype,
        "MinimumAmount": this.textdata['MinimumAmount'],
        "MaximumDiscount": this.textdata['MaximumDiscount'],
        "ValidFrom":this.textdata['ValidFrom'],
        "ValidTo": this.textdata['ValidTo'],
        "CouponAppliesTo":getNumber('stitchorstorefinal'),
        "Message": "",
        "imageId": getNumber('bannerId'),
        "CoupanRedemtionmethod":this.applymodeval,
        "CoupanType":  localStorage.getItem('CoupanType'),
        "TailorId": getNumber("userId"),
            }
            console.log('data',data)
            if( this.textdata['couponcodeId'] == null){
              this.toastshow('Please enter  promoCode')
            }else if(this.textdata['DiscountValue'] == null){

              this.toastshow('Please enter  offer value')
            }else if(this.textdata['MinimumAmount'] == null){
              this.toastshow('Please enter  MinimumAmount value')
            }else if(this.textdata['MaximumDiscount'] == null){
              this.toastshow('Please enter  MaximumDiscount value')

            }else if(this.textdata['ValidFrom'] == null){
              this.toastshow('Please enter  promotion Starts on')

            }else if(this.textdata['ValidTo'] == null){
              this.toastshow('Please enter  promotion Ends on')

            }else if(!getNumber('bannerId')){
              this.toastshow('Please Choose Banner')

            }else if(!getNumber('stitchorstorefinal')){
              this.toastshow('Please Choose PromoAppliesTo')

            }else{
              this.api.insertnewPromotion(data).subscribe(res=>{
                console.log('res',res)
                if(res['Result']=='1'){
                  if(this.promoId == 0){

                    if(this.lang=='English'){
                      this.api.showtoast('Promotion Successfully created!')
                    }else{
                      this.api.showtoast('تم إنشاء العرض بنجاح')
                    }
                    this.router.navigate(['/homenew'])
                  }else{
                    if(this.lang=='English'){
                      this.api.showtoast('Promotion Successfully Updated!')
                    }else{
                      this.api.showtoast('تم تحديث العرض بنجاح')
                    }
                    this.router.navigate(['/ManagePromotionComponent'])
                  }
                }
              })
            }
     

          }

        },200)
      })

  }
toastshow(val){
  const toast = new Toasty({ text: val});
  toast.textColor = '#fff';
  toast.backgroundColor ='gray';
   toast.show();
}
  goBack(){
    if(this.promoId == 0){
      this.router.navigate(['/homenew'])
    }else{
      this.router.navigate(['/ManagePromotionComponent'])
    }
  }
}
