import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-stitching-sub-prod-promotion',
  templateUrl: './stitching-sub-prod-promotion.component.html',
  styleUrls: ['./stitching-sub-prod-promotion.component.css']
})
export class StitchingSubProdPromotionComponent implements OnInit {
  lang='English'
  aedata;
  flatcheck=true
  discountcheck=false
  loader='false'
  subtype: any;
  imageurl: string;
  selectedsubTypeId: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+'DressSubType/'
    this.getdressSubtype()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getdressSubtype(){
  let tailorId=getNumber("userId")
  let dressId=getNumber('dressidnew')
  this.api.GetallDressSubType(dressId,tailorId).subscribe(res=>{
console.log('res',res)
this.subtype=res['Result']
  })
}
selectsubtype(id){
  this.selectedsubTypeId=id
}
done(){
  localStorage.setItem('CoupanType',this.selectedsubTypeId)
  this.router.navigate(['/PromotionHomeComponent'],{queryParams:{"pageid":'idd'}})
}
goBack(){
  this.router.navigate(['/StitchingProdPromotionComponent'])
}
}
