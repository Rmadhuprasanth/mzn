import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-cameramodal',
  templateUrl: './cameramodal.component.html',
  styleUrls: ['./cameramodal.component.css']
})
export class CameramodalComponent implements OnInit {
  lang='English'
  aedata;
items =[{"Id":1,"Name":"Camera"},{"Id":2,"Name":"Gallery"}]
  constructor(private params: ModalDialogParams,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
  } 
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  choosecmamodal(name){
    this.params.closeCallback(name);
  }
  close() {
    this.params.closeCallback();
}
}
