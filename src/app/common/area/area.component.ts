import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  lang='English'
  aedata;
  area: any;
  stateId: any;

  constructor(public api:ApiServiceService,private params: ModalDialogParams,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.stateId=this.params.context.stateid
    console.log('stateid',this.params)
    this.getAreaByState()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  getAreaByState(){
    let stateId={'StateId':this.stateId}
    this.api.getAreaBystate(stateId).subscribe(res=>{
      console.log(res)
      this.area=res['Result']
    })
  }
  closestate(item){
  
    this.params.closeCallback(item);
  }
  close() {
    this.params.closeCallback();
}
}
