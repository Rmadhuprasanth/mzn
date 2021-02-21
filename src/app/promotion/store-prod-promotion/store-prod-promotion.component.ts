import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-store-prod-promotion',
  templateUrl: './store-prod-promotion.component.html',
  styleUrls: ['./store-prod-promotion.component.css']
})
export class StoreProdPromotionComponent implements OnInit {
  lang='English'
  aedata;
  flatcheck=true
  discountcheck=false
  loader='false'
  selestedcat=1
  storeproducts: any;
  imagurl: string;
  slectedprodId;
  brandprod: any;
  brandimgurl: string;
  slectedbrandId;
  slectedgender=2
  categoryforprod: any;
  CategoriesIconImage: string;
  selectedcategoryid: any;
  CoupanTypeid: any;
  stitchorstorefinal: number;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imagurl=this.api.imageurl+'Products/'
    this.getBrandproducts()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getprodforcat(selectdcatid){
    this.selestedcat=selectdcatid
    if(selectdcatid==1){
      this.getBrandproducts()
    }else if(selectdcatid==2){
this.getstoreproducts()
    }else{
      this.getcatogoryproducts()
    }
  }
getcatogoryproducts(){
  let tailorId=getNumber("userId")
  this.api.getcategoryproductsforbanner(tailorId).subscribe(res=>{
    console.log('res',res)
    this.CategoriesIconImage=this.api.imageurl+"CategoriesIconImage/"
    this.categoryforprod=res['Result']
  })
}
getdresstypeforbanner(genderid){
  this.slectedgender=genderid
}
getstoreproducts(){
  let tailorId=getNumber("userId")
  this.api.getstoreProductsforbanner(tailorId).subscribe(res=>{
    console.log('res',res)
    this.storeproducts=res['products']
  })
}
getBrandproducts(){
  let tailorId=getNumber("userId")
  this.api.getBrandsproductsforbanner(tailorId).subscribe(res=>{
    console.log('res',res)
    this.brandimgurl=this.api.imageurl+"brands/"
    this.brandprod=res['Result']
  })
}
getselestoreprod(id){
this.slectedprodId=id
this.CoupanTypeid=id
this.stitchorstorefinal=3
}
selectBrand(id){
  this.slectedbrandId=id
  this.CoupanTypeid=id
  this.stitchorstorefinal=4

}
getselestorecategory(id){
this.selectedcategoryid=id
this.CoupanTypeid=id
this.stitchorstorefinal=6
}
goBack(){
  this.router.navigate(['/PromotionHomeComponent'])
}
Save(){
localStorage.setItem('CoupanType',this.CoupanTypeid)
setNumber('stitchorstorefinal',this.stitchorstorefinal)
  this.router.navigate(['/PromotionHomeComponent'],{queryParams:{"pageid":'idd'}})
}
}
