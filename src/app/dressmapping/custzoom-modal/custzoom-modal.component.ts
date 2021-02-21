import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-custzoom-modal',
  templateUrl: './custzoom-modal.component.html',
  styleUrls: ['./custzoom-modal.component.css']
})
export class CustzoomModalComponent implements OnInit {
  lang='English'
  aedata;
  zoomimage: any;

  constructor(public api:ApiServiceService,private params: ModalDialogParams,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.zoomimage=this.api.imageurl+'Customazation3/'+this.params.context.zoomImg
    console.log('mmmm',this.zoomimage)
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  close() {
    this.params.closeCallback();
  }
}
