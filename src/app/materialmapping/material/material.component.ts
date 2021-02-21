import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ActivatedRoute } from '@angular/router';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  lang='English'
  aedata;
material;
  imageurl: string;
  routepageId: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+'Pattern/'
    this.getMaterialList()
    this.params.queryParams.subscribe(x=>{
      if(x['pageid']){
        this.routepageId=x['pageid']
      }
    })
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getMaterialList(){
    var TailorId=getNumber("userId")
    // var TailorId='230'
    this.api.getMaterialList(TailorId).subscribe(res=>{
      this.material=res['Result']
      console.log('list',res)
    })
  }
  goBack(){
    if(this.routepageId == 'materialdetail'){
      this.router.navigate(['/skillupdate'])
    }else{
      this.router.back() 
    }
  } 
  gotodetails(Id){
    setNumber('materialId',Id)
    this.router.navigate(['/material-details'],{queryParams:{"materialId":Id}})
  }
}
