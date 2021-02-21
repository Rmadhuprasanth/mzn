import { Component, OnInit } from '@angular/core';

import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  lang='English'
  aedata;
  items;
  constructor(private params: ModalDialogParams, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang=localStorage.getItem('Language')
    this.getaedat()
    this.items =[{'Id':'1','Name':'English','identifier':'English'},{'Id':'2','Name':'Arabic','identifier':'عربى'}]
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  onItemTap(name){
    this.params.closeCallback(name);
  }
  close() {
    this.params.closeCallback();
}
} 
