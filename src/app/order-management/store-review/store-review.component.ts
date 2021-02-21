import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-store-review',
  templateUrl: './store-review.component.html',
  styleUrls: ['./store-review.component.css']
})
export class StoreReviewComponent implements OnInit {
  lang='English'
  aedata;
  imgUrl: string;
  storereview: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imgUrl=this.api.imageurl+'Products/'
    this.getstoreReview()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getstoreReview(){
    let detailId=getNumber('OrdId')
    // let detailId=13
    this.api.getRatingForstore(detailId).subscribe(res=>{
      console.log('res',res)
      this.storereview=res['Result']
    })
  }
  
  goBack(){
    this.router.back()
  } 
}
