import { Component, OnInit } from '@angular/core';

import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '../endpoint/api-service.service';
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
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
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { Country } from '../endpoint/interface';
import { EnANdAeJson } from '../endpoint/En-Ae.service';
@Component({
  selector: 'ns-home-new',
  templateUrl: './home-new.component.html',
  styleUrls: ['./home-new.component.css']
})
export class HomeNewComponent implements OnInit {
  lang='English'
  selectedindexval: string;
  selectedheaders: string;
  dasboarddata;
  profilImageURL: string;
  aedata;
  private _categoricalSource: ObservableArray<Country>;
  GetPendingOrderAMounts: any;
  GetRecivedOrderAMounts: any;
  GetMzyoonPaidAmount: any;
  GetMzyoonUnpaidAmounts: any;
  GetFullStatusValue: any;
  GetPerformenceStatus: any;

  constructor(private router: RouterExtensions,private api:ApiServiceService,public aetext:EnANdAeJson) { }
  get categoricalSource(): ObservableArray<Country> {
    return this._categoricalSource;
}
  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this._categoricalSource = new ObservableArray(this.api.getCategoricalSource());
    remove('stitchingorstore')
    remove('bannerimage')
    remove('bannerId')
    remove('stitchingorstore')
    localStorage.removeItem('CoupanType')
    remove('stitchorstorefinal')
    localStorage.removeItem('promodata')
    this.api.sideDrawer = true;
    this.selectedindex('0')
    this.selectedheader('0')
    this.getdashboarddata()
    this.gettailorProfile()
    this.dasboarddata={
      "CompletedOrder":"",
     "PendingOrder":"",
     "ApprovedRequest":"",
     "PendingRequest":"",
     "ReceivedAmount":"",
     "PendingAmount":"",
     "StockDelivered":"",
     "StockPending":"",
     "StockApproved":"",
     "StockWaiting":"",
    }
    console.log('data',localStorage.getItem('fcmtoken'))
this.insertDeviceDetails()
this.getanalyticsdata()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getanalyticsdata(){
    let year='2020'
    var TailorId = getNumber("userId");
    this.api.getAnalyticsdata(year,TailorId).subscribe(res=>{
      console.log('res',res)
      if(res){
        this.GetPendingOrderAMounts=res['Result']['GetPendingOrderAMounts']
        this.GetRecivedOrderAMounts=res['Result']['GetRecivedOrderAMounts']
        this.GetMzyoonPaidAmount=res['Result']['GetMzyoonPaidAmount']
        this.GetMzyoonUnpaidAmounts=res['Result']['GetMzyoonUnpaidAmounts']
        this.GetFullStatusValue=res['Result']['GetFullStatusValue'][0]['FullStatus']
        this.GetPerformenceStatus=res['Result']['GetPerformenceStatus']
      }
    })
  }
insertDeviceDetails(){  

  let data={
    "DeviceId": device.uuid,
    "Os": device.osVersion,
    "Manufacturer": device.manufacturer,
    "CountryCode": getNumber('countrycode'),
    "PhoneNumber": localStorage.getItem('phNumber'),
    "Model": device.model,
    "AppVersion": device.osVersion,
    "Type": "Tailor",
    "Fcm":localStorage.getItem('fcmtoken'),
  }
  console.log('data',data)
  this.api.insertDeviceDetails(data).subscribe(res=>{
    console.log('res',res)
  })
}

  gettailorProfile(){
    remove('TailorNameInEnglish')
    remove('ShopOwnerImageURL')
    var TailorId = getNumber("userId");
    this.api.getTailorProfile(TailorId).subscribe(res => {
console.log('prof',res)
this.profilImageURL=this.api.imageurl + 'TailorImages/' + res['Result'][0]['ShopOwnerImageURL']
setString('TailorNameInEnglish',res['Result'][0]['TailorNameInEnglish'])
setString('ShopOwnerImageURL',this.api.imageurl + 'TailorImages/' + res['Result'][0]['ShopOwnerImageURL'])
    })
}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
selectedheader(val){
if(val=='0'){
  this.selectedheaders='0'
}else if(val=='1'){
  this.selectedheaders='1'
}
}
selectedindex(val){
  if(val=='0'){

    this.router.navigate(['/homenew'])  
    this.selectedindexval='0'
  }else if(val=='1'){
    this.router.navigate(['/StorelistComponent']) 
    this.selectedindexval='1'
  }else if(val=='2'){   
    this.router.navigate(['/skillupdate']) 
    this.selectedindexval='2'
  }else if(val=='3'){
    this.router.navigate(['/Profile']) 
    this.selectedindexval='3'
  }
} 

getdashboarddata(){
  // let Id=398
  let Id= getNumber("userId");
  this.api.getDashboard(Id).subscribe(res=>{
    console.log('res',res)
    let data=res['Result'][0]
    this.dasboarddata['CompletedOrder']=data['CompletedOrder']
    this.dasboarddata['PendingOrder']=data['PendingOrder']
    this.dasboarddata['ApprovedRequest']=data['ApprovedRequest']
    this.dasboarddata['PendingRequest']=data['PendingRequest']
    this.dasboarddata['ReceivedAmount']=data['ReceivedAmount']
    this.dasboarddata['PendingAmount']=data['PendingAmount']
    this.dasboarddata['StockDelivered']=data['StockDelivered']
    this.dasboarddata['StockPending']=data['StockPending']
    this.dasboarddata['StockApproved']=data['StockApproved']
    this.dasboarddata['StockWaiting']=data['StockWaiting']
  })
}
gotocompletedordrList(){
  this.router.navigate(['/CompletedOrderListComponent'])
}
gotopendingordrList(){
  this.router.navigate(['/PendingOrderListComponent'])
}
gotobuyerpendingordrList(){
  this.router.navigate(['/BuyerpendingListComponent'])
}
gotobuyerapprovedList(){
  this.router.navigate(['/BuyerapprovedListComponent'])
}
gotoNotifications(){
  this.router.navigate(['/NotificationsComponent'])

}
gotopromotionList(){
  
  this.router.navigate(['/ManagePromotionComponent'])
}

}
