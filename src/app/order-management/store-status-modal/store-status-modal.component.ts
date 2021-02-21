import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-store-status-modal',
  templateUrl: './store-status-modal.component.html',
  styleUrls: ['./store-status-modal.component.css']
})
export class StoreStatusModalComponent implements OnInit {
  lang='English'
  aedata;
  items: any;
  selectedId: any;
  detailId: any;
  constructor(private params: ModalDialogParams,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void { 
    this.lang= localStorage.getItem('Language') 
    this.getaedat()
    this.detailId=this.params.context.detailId
   this.getStoreStatusList()
 }
 getaedat(){
  this.aedata=this.aetext.getArabicConent()
}
 getStoreStatusList(){
   this.api.getStoresList(this.detailId).subscribe(res=>{
    console.log('res',res)
     this.items=res
     this.items.map((x,i)=>{
       if(x['status']==true){
         this.items[i]['isactive']=true
       }else{
        this.items[i]['isactive']=false
       }
     })
     console.log('isactive',this.items)
   })
 }

 updateStoreStatus() {
  let temp={
    "OrderId":this.detailId,
"TrackingStatusId":this.selectedId
  }
  console.log("status",temp)
  this.api.updateStoreStatus(temp).subscribe(res=>{
    console.log("status",res)
    if(res['ResponseMsg'] == 'Success'){
      const toast = new Toasty({ text: 'Status Id :'+ res["Result"] });
      toast.textColor = '#fff';
      toast.backgroundColor ='gray';
       toast.show();
       this.params.closeCallback();
    }else{
      const toast = new Toasty({ text: res["Result"] });
      toast.textColor = '#fff';
      toast.backgroundColor ='gray';
       toast.show();
  this.params.closeCallback();
    }
  })
  // this.params.closeCallback();
}
 getstatus(checkvalcompany,Id){
  console.log('vall',checkvalcompany,Id)
  // this.items.map((x,i)=>{
  //     this.items[i]['status']=false
  // })
  if(checkvalcompany == "false"){
    this.items.map((x,i)=>{
      if(x['Id'] == Id){
        this.items[i]['status']=true
        this.selectedId=Id
      }
    })
  }else if(checkvalcompany == "true"){
    this.items.map((x,i)=>{
      if(x['Id'] == Id){
        this.items[i]['status']=false
      }
    })
  }
  }
}
