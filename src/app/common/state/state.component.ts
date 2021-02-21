import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  lang='English' 
  aedata; 
  states: any;
  countryId: any;

  constructor(public api:ApiServiceService,private params: ModalDialogParams,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.countryId=this.params.context.countryId
    this.getStateByCountry()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
getStateByCountry(){
  console.log(this.countryId)
  let Id={"Id":this.countryId}
  this.api.getstateByCountry(Id).subscribe(res=>{
    console.log(res)
    this.states=res['Result']
  })
}
closestate(item){
  
  this.params.closeCallback(item);
}
close() {
  this.params.closeCallback();
}
}
