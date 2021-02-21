import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-buyerapproved-list',
  templateUrl: './buyerapproved-list.component.html',
  styleUrls: ['./buyerapproved-list.component.css']
})
export class BuyerapprovedListComponent implements OnInit {
  lang='English'
  aedata;

  loader='false'
  list: any;
  imageurl: string;
  showdata: boolean;
  showtext: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { 
    
  }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.loader='true'
    remove('orderId')
    this.imageurl=this.api.imageurl+'BuyerImages/'
    this.getbuyerListA()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getbuyerListA(){
  var TailorId=getNumber("userId")
  // var TailorId=398
  this.api.getbuyerApprovedList(TailorId).subscribe(res=>{
    console.log('res',res)
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
this.router.navigate(['/BuyerapprovedDetailsComponent'])
}
  goBack(){
    this.router.navigate(['/homenew'])
  } 
}
