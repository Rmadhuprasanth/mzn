import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})
export class WriteReviewComponent implements OnInit {
  lang='English'
  aedata;
  Ratings: any;
  CustomerRating: any;
  MaterialRating: any;
  MaterialReview: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.getRatingsForStitching()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getRatingsForStitching(){
    let TailorId=getNumber('userId')
    let OrdId=getNumber('OrdId')
    // let TailorId=395
    // let OrdId=15535
    let Type='Order'
    this.api.getRatingsForStitching(TailorId,OrdId,Type).subscribe(res=>{
      console.log('rev',res)
     this.Ratings=res['Result']['Ratings']
     this.CustomerRating=res['Result']['CustomerRating']
     this.MaterialRating=res['Result']['MaterialRating']
     this.MaterialReview=res['Result']['MaterialReview']
    })
  }
  goBack(){
    this.router.back()
  } 
}
