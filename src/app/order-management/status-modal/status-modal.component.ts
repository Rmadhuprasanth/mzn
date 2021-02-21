import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { Toasty, ToastPosition } from 'nativescript-toasty';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.css']
})
export class StatusModalComponent implements OnInit {
  lang='English'
  aedata;
//   items =[{"Id":1,"Name":"Order Placed","Switch":false},
//   {"Id":2,"Name":"Material Recieved","Switch":false},
//   {"Id":3,"Name":"Material Recieved","Switch":false},
//   {"Id":4,"Name":"Measurement Done","Switch":false},
//   {"Id":5,"Name":"Stitching Started","Switch":false},
//   {"Id":6,"Name":"Ready For dispatch","Switch":false}
// ]
items: any;
  selectedId: any;
  detailId: any;
  constructor(private params: ModalDialogParams,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {  
    this.lang= localStorage.getItem('Language')
    this.getaedat()
     this.detailId=this.params.context.detailId
    this.getStitchingStatusList()
  } 
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getStitchingStatusList(){
    this.api.getTrackingListStitching(this.detailId).subscribe(res=>{
      this.items=res["Result"]
      if( this.items){

        this.items.map((x,i)=>{
          if(x['status']==true){
            this.items[i]['isactive']=true
          }else{
           this.items[i]['isactive']=false
          }
        })
      }
    })
  }
  updateStichingStatus() {
    let temp={
      "OrderId":this.detailId,
"TrackingStatusId":this.selectedId
    }
    console.log("status",temp)
    this.api.updateStitchingStatus(temp).subscribe(res=>{
      console.log("status",res)
      if(res['Result'] == '1'){
        const toast = new Toasty({ text: 'SuccessFully Updated' });
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
