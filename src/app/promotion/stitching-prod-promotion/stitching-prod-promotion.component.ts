import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-stitching-prod-promotion',
  templateUrl: './stitching-prod-promotion.component.html',
  styleUrls: ['./stitching-prod-promotion.component.css']
})
export class StitchingProdPromotionComponent implements OnInit {
  lang='English'
  aedata;
  slectedgender=1
  loader='false'
  dresstype: any;
  imageurl: string;
  selecteddressId;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    remove('dressidnew') 
    this.imageurl=this.api.imageurl+'DressTypes/'
    let id=1
    this.getdresstypeforbanner(id)
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getdresstypeforbanner(id){
let genderId=id
this.slectedgender=id
this.api.getdresstypeforbanner(genderId).subscribe(res=>{
  console.log('res',res)
  this.dresstype=res['Result']
})
}
selectdress(id){
this.selecteddressId=id
}
next(){

  setNumber('dressidnew',this.selecteddressId)
  this.router.navigate(['/StitchingSubProdPromotionComponent'])
}
goBack(){
  this.router.navigate(['/PromotionHomeComponent'])
}
}
