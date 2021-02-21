import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-buyerpending-list',
  templateUrl: './buyerpending-list.component.html',
  styleUrls: ['./buyerpending-list.component.css']
})
export class BuyerpendingListComponent implements OnInit {
  lang='English'
  aedata;
  list: any;
  imageurl: string;
  loader='false'
  showtext: boolean;
  showdata: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.loader='true'
    remove('orderId')
    this.imageurl=this.api.imageurl+'BuyerImages/'
    this.getbuyerList()
  
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getbuyerList(){
  var TailorId=getNumber("userId")
  console.log('TailorId',TailorId)
  // var TailorId=398
  this.api.getbuyerRequestList(TailorId).subscribe(res=>{
    // console.log('res',res)
    if(res){
      this.list=res['Result']
      if(this.list.length !=0){
        this.showdata=true
        this.showtext=false
      }else{
        this.showdata=false
        this.showtext=true
      }
      this.loader='false'
      this.page.actionBarHidden = false;
    }
  })
}
gotoDetails(orderId){
  setNumber('orderId',orderId)
  this.router.navigate(['/BuyerpendingDetailsComponent'])
  }

  goBack(){
    this.router.navigate(['/homenew'])
  } 
}
