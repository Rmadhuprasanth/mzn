import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ValueList } from "nativescript-drop-down";
import { CountryDialogComponent } from '../country-dialog/country-dialog.component';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { DeviceInfo } from 'nativescript-dna-deviceinfo';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";import {
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
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lang='English'
  aedata;
  public selectedIndex = 1;
    public items: Array<string>;
  dialogOpen = false;
 itemSource = new ValueList<string>([
    { value: "FL", display: "971" }, 
    { value: "MI", display: "91" }
]);
  code: any;
  flag: any;
  Id: any;
  imageurl: any;
  number: any;
  deviceId: any;
  langtext='English';
  
  constructor(private page: Page,private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef,private router: RouterExtensions,
    public params: ActivatedRoute,private api:ApiServiceService, public aetext:EnANdAeJson) {  
      this.items = [];
      for (var i = 0; i < 5; i++) {
          this.items.push("" + i);
      }
      this.number=""
   }

  ngOnInit(): void {
    if(localStorage.getItem('Language')) {

      this.lang=localStorage.getItem('Language')
      if(this.lang == 'Arabic'){
        this.langtext='عربى'
      }
    }else{
      localStorage.setItem('Language','English')
      this.lang= localStorage.getItem('Language')
    }
    this.getaedat()
    this.api.sideDrawer = false;
    // var userId="259";
    var userId=getNumber("userId");
    console.log('user',userId)
    if(userId != null || userId != undefined){
      this.router.navigate(['/homenew']) 
    }
    this.imageurl=this.api.imageurl+'Flags/'
  
      this.code='971'  
      this.flag="UnitedArabEmirates.png"
      this.Id=1
  
  
    this.page.actionBarHidden = true;  
    this.deviceId=device.uuid  




  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
 
  public onchange(args: SelectedIndexChangedEventData) { 
    console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
}
ongetnumber(args){
  
  console.log("evt",args.text);
}
public onopen() {
    console.log("Drop Down opened.");
}

public onclose() {
    console.log("Drop Down closed.");
}


showcountryModal(){
  const options: ModalDialogOptions = {
    viewContainerRef: this.viewContainerRef,
    fullscreen: false,
    context: {}
};
this.modalService.showModal(CountryDialogComponent, options).then(res => {
  console.log('rerrr',res);
  this.code=res['PhoneCode']
  this.flag=res['Flag']
  this.Id=res['Id'] 
});
}
showModal() {
  const options: ModalDialogOptions = {
      viewContainerRef: this.viewContainerRef,
      fullscreen: false,
      context: {}
  };
  this.modalService.showModal(LoginDialogComponent, options).then(res=>{
    console.log('rerrr',res);
     localStorage.setItem('Language',res.Name)
    this.langtext=res.identifier
    this.lang=res.Name
  })
}
gotootp(){
  let temp={
    "DeviceId":this.deviceId,
"CountryCode":this.code,
"PhoneNo":this.number,
"Language":'English'
  }
  setNumber('countrycode',Number(this.code))
  localStorage.setItem('phNumber',this.number)
  console.log('x',this.number)
  console.log(',this.number', localStorage.getItem('phNumber'))
  if(this.number){
    this.api.generateOTP(temp).subscribe(x=>{
      console.log('x',x)
      if(x['ResponseMsg']=='Success'){
  
        this.router.navigate(['/otp'],{queryParams:{'code':this.code,"DeviceId":this.deviceId,"PhoneNo":this.number}})
      }
    })
  }else{
    if(this.lang == 'English'){
      this.showtoast('Please enter mobile number !')
    }else{
      this.showtoast('الرجاء إدخال رقم الموبايل')
    }
  }
 
}
insertlanguage(){
  let data={
    "Id":"249",
"language":"English",
"Type":"Tailor"
}
  this.api.insertlanguage(data).subscribe(res=>{
    console.log('res',res)
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
