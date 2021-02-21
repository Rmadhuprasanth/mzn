import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.css']
})
export class ConsentModalComponent implements OnInit { 
   lang='English'
   aedata;
  alerttxt: any;
  alerttxtae: any;

  constructor(private params: ModalDialogParams, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.alerttxt=this.params.context.alerttxt
    this.alerttxtae=this.params.context.alerttxtae
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  public close(result: string) {
    this.params.closeCallback(result);
}
public okfunc(result: string) {
  this.params.closeCallback(result);
}
}
