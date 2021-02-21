import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from 'nativescript-angular/router';
import * as TNSInbox from 'nativescript-sms-inbox';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import * as permissions from 'nativescript-permissions';
import {
  getBoolean,
  setBoolean,
  getNumber,
  setNumber,
  getString,
  setString,
  hasKey,
  remove,
  clear
} from "tns-core-modules/application-settings";
import * as app from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";
import { SmsReceiver } from 'nativescript-sms-receiver';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

//declare this to use android variable
declare var android:any;
@Component({
  selector: 'ns-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  lang='English'
  aedata;
  otpval1: any;
  otpval2: any;
  otpval3: any;
  otpval4: any;
  otpval5: any;
  otpval6: any;
  countrycode: any;
  DeviceId: any;
  PhoneNo: any;
  isFocused = false
  @ViewChild("otp1", {static: false}) password1: ElementRef;
  @ViewChild("otp2", {static: false}) password2: ElementRef;
  @ViewChild("otp3", {static: false}) password3: ElementRef;
  @ViewChild("otp4", {static: false}) password4: ElementRef;
  @ViewChild("otp5", {static: false}) password5: ElementRef;
  @ViewChild("otp6", {static: false}) password6: ElementRef;
  otpvalue: any[];
  Otpnumber
  constructor(private page: Page,private router: RouterExtensions,
    public params:ActivatedRoute,public api:ApiServiceService, public aetext:EnANdAeJson) { }
 
  ngOnInit(): void {   
    this.lang=localStorage.getItem('Language')
    this.getaedat()
    this.Otpnumber={
      'Number':''
    }
    this.otpvalue=[]
    this.params.queryParams.subscribe(res=>{
      if(res){
        this.countrycode=res['code']
        this.DeviceId=res['DeviceId']
        this.PhoneNo=res['PhoneNo']
        
      }
    })
    this.page.actionBarHidden = true;
    
    
    // setTimeout(() => {
    //   this.getInboxMessages() 
    //   }, 7000);

  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }


  gotohome(){
this.router.navigate(['/home']) 
  }
  

  public getInboxMessages() { 
    permissions.requestPermission(android.Manifest.permission.READ_SMS,
"Mzyoon-Tailor needs permission to read your sms messages").then(() => {   
    TNSInbox.getInboxes({ max: 1}).then((res) => {
      if(res){
        var str=res['data'][0]['message']
        var num=str.replace( /^\D+/g, '')
        var mystring = num.substring(0, 6);
        var otpnumber=mystring
        var regInteger = /^-?\d+$/;

        var data=otpnumber.toString()
            let checkint=regInteger.test(data) ;
            console.log('chekkk',checkint)
            if(checkint == true){
              this.Otpnumber['Number']=otpnumber
        if(this.Otpnumber['Number'].length == 6){  
          let temp={
           "DeviceId":this.DeviceId,
           "CountryCode":this.countrycode,
           "PhoneNo":this.PhoneNo,
           "Type":"Tailor",
           "OTP":this.Otpnumber['Number'] 
          }
          console.log('temp',temp)
          this.api.validateOTP(temp).subscribe(result=>{
            console.log('res',result)
            if(result['UserId'] != null){
             setNumber("userId",result['UserId'] );
            this.getTailorProfile(result['UserId'])
           }
          }) 
         }
        }
        }

    }, (err) => {
        console.log('Errornew: ' + err);
    });
  })
}
otp1(e){
  if(e.value.length == 6){  
   let temp={
    "DeviceId":this.DeviceId,
    "CountryCode":this.countrycode,
    "PhoneNo":this.PhoneNo,
    "Type":"Tailor",
    "OTP":e.value
   }
   console.log('temp',temp)
   this.api.validateOTP(temp).subscribe(result=>{
     console.log('res',result)
     if(result['UserId'] != null){
      setNumber("userId",result['UserId'] );
      this.getTailorProfile(result['UserId'])
    }else{
      if(this.lang=='English'){
        this.api.showtoast('Invalid OTP!')
      }else{
        this.api.showtoast('كلمة السر لمرة واحدة غير صحيحة')
      }
    }
   },error =>{
    if(error){
      if(this.lang=='English'){
        this.api.showtoast('Invalid OTP!')
      }else{
        this.api.showtoast('كلمة السر لمرة واحدة غير صحيحة')
      }
    }
  }) 
  }
  }
  getTailorProfile(TailorId) {
    this.api.getTailorProfile(TailorId).subscribe(res => {
      console.log('profile',res) 
      if(res['ResponseMsg']=='Success'){
        if(res['Result'][0]['TailorNameInEnglish'] != null && res['Result'][0]['EmailId'] != null){
          
          setString('userName',res['Result'][0]['TailorNameInEnglish'])
          this.router.navigate(['/homenew'])
        }else{
          this.router.navigate(['/IntropageComponent'])
        }
      }
    })
    }
  resendotp(){
    let temp={
      "DeviceId":this.DeviceId,
      "CountryCode":this.countrycode,
      "PhoneNo":this.PhoneNo,
    }
    this.api.resendOTP(temp).subscribe(x=>{
      console.log('sent',x) 
    })
  }
  changeNumber(){
    this.router.navigate(['/Login'])
  }


           

  //           otpController(event,index){  
  //             console.log(event);
  //             if(event.value.length !=1){
  //               this.setFocus(index-2);  
  //             }else{
  //               this.otpvalue.push(event.value);  
  //               let finalotp= this.otpvalue[0] + this.otpvalue[1] + this.otpvalue[2] + this.otpvalue[3] + this.otpvalue[4] + this.otpvalue[5]
            
  //               if(this.otpvalue.length == 6){ 
  //                 if (finalotp.toString().length == 6) {
  //  let temp={
  //                  "DeviceId":this.DeviceId,
  //                  "CountryCode":this.countrycode, 
  //                  "PhoneNo":this.PhoneNo,
  //                  "Type":"Tailor",
  //                  "OTP":finalotp
  //                 }
  //                 console.log('temp',temp)
  //                 this.api.validateOTP(temp).subscribe(result=>{
  //                   console.log('res',result)
  //                   if(result['UserId'] != null){
  //                    setNumber("userId",result['UserId'] );
  //                    setNumber("ShopProfileId",result['ShopProfileId'] );
  //                    this.router.navigate(['/homenew'])
  //                  }
  //                 }) 
  //                 }
                
               
  //                }
  //               this.setFocus(index);     
  //             }
  //           }
  //           setFocus(index){
       
  //             switch(index){
  //               case 0:
  //               this.password1.nativeElement.focus();
  //               break;
  //               case 1:
  //                 this.password2.nativeElement.focus();
  //               break;
  //               case 2:
  //                 this.password3.nativeElement.focus();
  //               break;
  //               case 3:
  //                 this.password4.nativeElement.focus();
  //               break;
  //               case 4:
  //                 this.password5.nativeElement.focus(); 
  //               break;
  //               case 5:
  //                 this.password6.nativeElement.focus();
  //               break;
  //               }
  //          }
}
