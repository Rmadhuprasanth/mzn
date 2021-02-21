import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Toasty, ToastPosition } from 'nativescript-toasty';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-name-modal',
  templateUrl: './name-modal.component.html',
  styleUrls: ['./name-modal.component.css']
})
export class NameModalComponent implements OnInit {
  lang='English'
  aedata;
  Name: any;
  dressName: any;

  constructor(private params: ModalDialogParams, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()

    this.dressName=this.params.context.dressName
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  onTextChange(event){
this.Name=event.value
  }
  getName(){
    console.log("name",this.Name)
    if(this.Name == undefined){
      if(this.lang=='English'){
        this.showtoast('Please Enter Measurement Name !')
      }else{
        this.showtoast('الرجاء إدخال إسم للمقاس')
      }
    }else{

      this.params.closeCallback(this.Name);
    }
  }
close(){
  this.params.closeCallback();
}
showtoast(val){
  const toast = new Toasty({ text: val});
  toast.textColor = '#fff';
  toast.backgroundColor ='gray';
  toast.position=ToastPosition.CENTER
   toast.show();
}
}
