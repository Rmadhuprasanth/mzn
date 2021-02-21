import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
  selector: 'ns-gendermodal',
  templateUrl: './gendermodal.component.html',
  styleUrls: ['./gendermodal.component.css']
})
export class GendermodalComponent implements OnInit {
  lang='English'
  items;
  constructor(private params: ModalDialogParams) {
    this.items =[{"Id":1,"Name":"Male"},{"Id":2,"Name":"Female"}]
   }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
  }
  choosegender(name){
    console.log('nameee',name)
    this.params.closeCallback(name);
  }
  close() {
    this.params.closeCallback();
}
}
