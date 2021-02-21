import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import * as dialogs from "tns-core-modules/ui/dialogs";
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-goto-branch',
  templateUrl: './goto-branch.component.html',
  styleUrls: ['./goto-branch.component.css']
})
export class GotoBranchComponent implements OnInit {
  lang='English'
  aedata;
  Branches: any;

  constructor(public router:RouterExtensions,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this. getshoplist()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  goBack(){
    this.router.back()
  }
  getshoplist() {

    var TailorId=getNumber("userId");
    // var TailorId = "259";
    this.api.getshoplist(TailorId).subscribe(res => {
      console.log('reyyys', res)
      this.Branches=res['Result']
      if(this.Branches.length == 0){
        dialogs.confirm("Your Branch Is Empty.Please Add Branch!").then(result => {
          if(result==true){
      
            this.router.navigate(['/Profile'])
          }
      
      });
      }
    })
    
  }
  gotocountry(shopId){
    setNumber('shopId',shopId)
    this.router.navigate(['/GotoCountryComponent'])
  }
}
