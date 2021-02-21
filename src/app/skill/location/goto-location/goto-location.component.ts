import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import {getBoolean,setBoolean,getNumber,setNumber,getString,setString,hasKey, remove,clear} from "tns-core-modules/application-settings";
import { ActivatedRoute } from '@angular/router';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-goto-location',
  templateUrl: './goto-location.component.html',
  styleUrls: ['./goto-location.component.css']
})
export class GotoLocationComponent implements OnInit {
  lang='English'
  aedata;
  Loactionarray: any;
  ordertypedata: any;
  selctallValue='false'
  checkimg='~/assets/dashbord/Unchecked.png'
  stateId: any;
  constructor(public router:RouterExtensions,public api:ApiServiceService,public params:ActivatedRoute,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.ordertypedata=[]
    // this.params.queryParams.subscribe(x=>{
    //   if(x['stateId']){
    //     this.getLocationservices(x['stateId'])
    //     this.stateId=x['stateId']
    //   }
    // })
    
    this.stateId=getNumber('stateId')
    this.getLocationservices(this.stateId)
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getLocationservices(stateId){ 
    var TailorId=getNumber("userId");
    var shopId=getNumber("shopId");
    this.api.getGetLocationService(TailorId,shopId,stateId).subscribe(res=>{
      console.log('location',res)
      this.Loactionarray=res['Result']
      this.Loactionarray.map((x,i)=>{
        if(x['Switch'] == true){
            this.ordertypedata.push({'Id':x['Id']})
        };
      
      })
      this.Loactionarray.map((x,i)=>{
        if(this.Loactionarray[i]['Switch'] == true){
          this.selctallValue='true'
          this.checkimg='~/assets/dashbord/Check box.png'
        }else{
          
        this.selctallValue='false'
        this.checkimg='~/assets/dashbord/Unchecked.png'
        }
      })
    })
  }

  getcheckvalcompany(checkvalcompany,Id){
    console.log('vall',checkvalcompany,Id)
    if(checkvalcompany == 'false'){
      this.Loactionarray.map((x,i)=>{
        if(x['Id'] == Id){
          this.Loactionarray[i]['Switch']=true
            this.ordertypedata.push({'Id':Id})
        }
      })
      console.log('this.ordertypedata',this.ordertypedata)
    }else if(checkvalcompany == 'true'){
      this.Loactionarray.map((x,i)=>{
        if(x['Id'] == Id){
          this.Loactionarray[i]['Switch']=false
          this.ordertypedata = this.ordertypedata.filter(e => e['Id'] !== Id)
        }
      })
      
      console.log('this.uncheck',this.ordertypedata)
    }
    }

    getselectallval(val){
      console.log('vall',val)
      if(val == 'false'){  
        this.selctallValue='true'
        this.checkimg='~/assets/dashbord/Check box.png'
        this.Loactionarray.map((x,i)=>{
            this.Loactionarray[i]['Switch']=true
              this.ordertypedata.push({'Id':x['Id']})
        })
        console.log('selectall',this.ordertypedata)
      }else if(val == 'true'){
        this.selctallValue='false'
        this.checkimg='~/assets/dashbord/Unchecked.png'
        this.Loactionarray.map((x,i)=>{
          this.Loactionarray[i]['Switch']=false
            this.ordertypedata=[]
      })
      console.log('unselectedall',this.ordertypedata)
      }
      }
    insertlocationservice(){
      var TailorId=getNumber("userId");
      var shopId=getNumber("shopId");
      let temp={
        "TailorId":TailorId,
        'StateId':this.stateId,
        "ShopId":shopId,
        "AreaId":this.ordertypedata,
      }
      console.log('temp',temp)
this.api.insertLocation(temp).subscribe(res=>{
console.log('res',res)
if(res['Result']=='1'){
  this.router.navigate(['/skillupdate'])
  remove('shopId')
}
})
    }
  goBack(){
    this.router.back()
  }
}
