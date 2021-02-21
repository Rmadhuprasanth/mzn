import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-oandptime-modal',
  templateUrl: './oandptime-modal.component.html',
  styleUrls: ['./oandptime-modal.component.css']
})
export class OandptimeModalComponent implements OnInit {
  lang='English'
  timeData;
  aedata;
  constructor(private params: ModalDialogParams,public api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    // this.detailId=this.params.context.detailId
    this.getStoreTimes()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getStoreTimes(){
    this.api.getstoreTimings().subscribe(res=>{
      console.log('res',res)
      if(res){
        this.timeData=res['Result']
      }
    })
  }
  getTime(time,id){
    let temp={
      "time":time,
      'id':id
  }
    this.params.closeCallback(temp);
  
  }

close(){
  this.params.closeCallback();
}
}
