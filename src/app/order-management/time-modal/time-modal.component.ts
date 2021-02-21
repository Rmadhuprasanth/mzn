import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-time-modal',
  templateUrl: './time-modal.component.html',
  styleUrls: ['./time-modal.component.css']
})
export class TimeModalComponent implements OnInit {
  lang='English'
  aedata;
timeData=[
  {'time':"01.00 Am to 02.00 AM"},
{'time':"02.00 AM to 03.00 AM"},
{'time':"03.00 AM to 04.00 AM"},
{'time':"04.00 AM to 05.00 AM"},
{'time':"05.00 AM to 06.00 AM"},
{'time':"06.00 AM to 07.00 AM"},
{'time':"07.00 AM to 08.00 AM"},
{'time':"08.00 AM to 09.00 AM"},
{'time':"09.00 AM to 10.00 AM"},
{'time':"10.00 AM to 11.00 AM"},
{'time':"11.00 AM to 12.00 AM"},
{'time':"12.00 AM to 01.00 PM"},
{'time':"01.00 PM to 02.00 PM"},
{'time':"02.00 PM to 03.00 PM"},
{'time':"03.00 PM to 04.00 PM"},
{'time':"04.00 PM to 05.00 PM"},
{'time':"05.00 PM to 06.00 PM"},
{'time':"06.00 PM to 07.00 PM"},
{'time':"07.00 PM to 08.00 PM"},
{'time':"08.00 PM to 09.00 PM"},
{'time':"09.00 PM to 10.00 PM"},
{'time':"10.00 PM to 11.00 PM"},
{'time':"11.00 PM to 12.00 PM"},
]
  constructor(private params: ModalDialogParams,public api:ApiServiceService, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    
    // var datas=this.params.context.data
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
close(){
  this.params.closeCallback();

}
getTime(time){
  this.params.closeCallback(time);

}
}
