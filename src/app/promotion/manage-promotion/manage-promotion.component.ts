import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Page } from 'tns-core-modules/ui/page';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-manage-promotion',
  templateUrl: './manage-promotion.component.html',
  styleUrls: ['./manage-promotion.component.css']
})
export class ManagePromotionComponent implements OnInit {
  lang='English'
  aedata;
  loader='false'
  selectedheaders: string;
  ongoingpromo: any;
  expiredpromo: any;
  bannerurl: string;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    
    remove('promoId')
    this.loader='true'
    this.bannerurl=this.api.imageurl+'offer/'
    this.selectedheader('0')
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  selectedheader(val){
    this.loader='true'
    if(val=='0'){
      this.selectedheaders='0'
      let tailorId=getNumber("userId")
      this.api.getOngoingPromotions(tailorId).subscribe(res=>{
        console.log('res',res)
        this.ongoingpromo=res['Result']
        setTimeout(() => {
          this.loader='false'
this.page.actionBarHidden = false;
        }, 200);
      })
    }else if(val=='1'){
      this.selectedheaders='1'
      let tailorId=getNumber("userId")
      this.api.getExpiredPromotions(tailorId).subscribe(res=>{
        console.log('res',res)
        this.expiredpromo=res['Result']
        setTimeout(() => {
          this.loader='false'
this.page.actionBarHidden = false;
        }, 200);
      })
    }
    } 
    gotoeditPromotion(Id){
      setNumber('promoId',Id)
    this.router.navigate(['/PromotionHomeComponent'],{queryParams:{'promoId':Id}})
    }
  goBack(){
    this.router.navigate(['/homenew'])
  }
}
