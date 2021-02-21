import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { Page } from 'tns-core-modules/ui/page';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-buyer-material',
  templateUrl: './buyer-material.component.html',
  styleUrls: ['./buyer-material.component.css']
})
export class BuyerMaterialComponent implements OnInit {
  lang='English'
  aedata;
  bannerimg;
  imgUrlPattern: string;
  GetPattern: any;
  GetThickness: any;
  GetColors: any;
  patternShow: boolean;
  loader='false'
  zoomimg: string;
  customization: any;
  hidemain: boolean;
  showmain: boolean;
  constructor(public router:RouterExtensions,public api:ApiServiceService,private page: Page, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.bannerimg=[]
    this.getMaterialDetails()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getMaterialDetails(){
    this.loader="true"
    let TailorId=getNumber('userId')
    let MaterialId=getNumber('petternId')
    // let TailorId=398
    // let MaterialId=68
    if(MaterialId == 0){
      this.imgUrlPattern=this.api.imageurl+'MaterialImages/'
      this.patternShow=false
      this.hidemain=true
      this.showmain=false
      let bannerimg=JSON.parse(getString('mateimages'))
      console.log('matimg',bannerimg)
      this.zoomimg=this.api.imageurl+'MaterialImages/'+bannerimg[0]['Image']
      this.customization=bannerimg
     
      this.loader="false"
    this.page.actionBarHidden = false;
    
      }else{

        this.api.getMaterialDetailsforOrder(TailorId,MaterialId).subscribe(res=>{
          console.log('res',res)
          this.patternShow=true
          this.hidemain=false
          this.showmain=true
            if(res['Result']['PatternImg']){
              this.imgUrlPattern=this.api.imageurl+'pattern/'
              this.bannerimg=res['Result']['PatternImg']
            }
            this.GetPattern=res['Result']['GetPattern']
            this.GetThickness=res['Result']['GetThickness']
            this.GetColors=res['Result']['GetColors']
            this.loader="false"
          this.page.actionBarHidden = false;
        })


      }
  }
  selecimg(img){
    this.zoomimg=this.api.imageurl+'MaterialImages/'+img
  }
  goBack(){
    this.router.back()
  } 
}
