import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-rejected-details',
  templateUrl: './rejected-details.component.html',
  styleUrls: ['./rejected-details.component.css']
})
export class RejectedDetailsComponent implements OnInit {
  lang='English'
  aedata;
  productdetailsarray;
  imagurl: string;
  sizearray: Object;
  colorarrray: any;
  myData: any; 
  prodImages: any;
  rejectNotes: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imagurl=this.api.imageurl+'Products/'
    this.prodImages=[]
    this.productdetailsarray={
         "Id":"",
         "CategoryId":"",
         "CategoryName":"",
         "ProductName":"",
         "ProductDescription":"",
         "ProductImage":"",
         "SKU":"",
         "SellerId":"",
         "ProductDescriptionInArabic":"",
         "IsProduct":"",
         "BrandName":"",
         "NewPrice":"",
         "Amount":"",
         "IsActive":"",
    }
  this.getcolor()
  // this.getBrand()
  this.getSize()
      this.getproductdetails()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getproductdetails(){
    let productId=getString("rejectprId")
    if(productId){
      this.api.getRejectedProjectsdetails(productId).subscribe(detail=>{
console.log('detail',detail)

if(detail['products']){
this.productdetailsarray['Id']= detail['products']['Id']
this.productdetailsarray['CategoryId']= detail['products']['CategoryId'] 
this.productdetailsarray['CategoryName']= detail['products']['CategoryName']
this.productdetailsarray['ProductName']= detail['products']['ProductName']
this.productdetailsarray['ProductDescription']= detail['products']['ProductDescription']
this.productdetailsarray['ProductImage']= detail['products']['ProductImage']
this.productdetailsarray['SKU']= detail['products']['SKU']
this.productdetailsarray['SellerId']= detail['products']['SellerId']
this.productdetailsarray['ProductDescriptionInArabic']= detail['products']['ProductDescriptionInArabic']
this.productdetailsarray['IsProduct']= detail['products']['IsProduct']
this.productdetailsarray['BrandName']= detail['products']['BrandName']
this.productdetailsarray['NewPrice']= detail['products']['NewPrice']
this.productdetailsarray['Amount']= detail['products']['Amount']
this.productdetailsarray['IsActive']= detail['products']['IsActive']
  
}
if(detail['RejectNotes']){
this.rejectNotes=detail['RejectNotes']
console.log('reject',this.rejectNotes)
}
if(detail['productImages']){
  this.myData=detail['productImages']
  this.myData.map(x=>{
  if(x['Small']){
    this.prodImages.push({'Image':x['Small']})
  }
  })
  }
      })
    }
  }

  getcolor(){
    this.api.getColor().subscribe(color=>{
    
      this.colorarrray=color
      this.colorarrray = this.colorarrray.filter(e => (e['ColorCode'] !== "#FF0000\t" && e['ColorCode'] !== "#800000\t" && e['ColorCode'] !== "this.colorvalue"))
      // console.log('colorarrray',this.colorarrray)
    })
  }
  getBrand(){
    this.api.getBrand().subscribe(brand=>{
      console.log('brand',brand)
    })
  }
  getSize(){
    this.api.getSize().subscribe(size=>{
      // console.log('size',size)
      this.sizearray=size
    })
  }
  goBack(){
    this.router.back()
  }
}
