import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ActivatedRoute } from '@angular/router';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-goto-state',
  templateUrl: './goto-state.component.html',
  styleUrls: ['./goto-state.component.css']
})
export class GotoStateComponent implements OnInit {
  lang='English'
  aedata;
  states: any;
  countryId: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    // this.params.queryParams.subscribe(x=>{
    //   if(x['countryId']){
    //     this.countryId=x['countryId']
    //   }
    // })
    this.countryId=getNumber('countryId')
    this.getStateByCountry()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getStateByCountry(){
    
  let Id={"Id":this.countryId}
    this.api.getstateByCountry(Id).subscribe(res=>{
      console.log(res)
      this.states=res['Result']
    })
  }
  gotoLocation(stateId){

    setNumber('stateId',stateId)
    this.router.navigate(['/GotoLocationComponent'],{queryParams:{'stateId':stateId}})
  }
  goBack(){
    this.router.back()
  }
}
