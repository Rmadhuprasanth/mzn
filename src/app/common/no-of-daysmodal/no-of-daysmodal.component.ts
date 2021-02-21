import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';

@Component({
  selector: 'ns-no-of-daysmodal',
  templateUrl: './no-of-daysmodal.component.html',
  styleUrls: ['./no-of-daysmodal.component.css']
})
export class NoOfDaysmodalComponent implements OnInit {
  lang='English'
  aedata;
items=[
  {'No':1},
{'No':1},
{'No':2},
{'No':3},
{'No':4},
{'No':5},
{'No':6},
{'No':7},
{'No':8},
{'No':9},
{'No':10},
{'No':11},
{'No':12},
{'No':13},
{'No':14},
{'No':15},
{'No':16},
{'No':17},
{'No':18},
{'No':19},
{'No':20},
{'No':21},
{'No':22},
{'No':23},
{'No':24},
{'No':25},
{'No':26},
{'No':27},
{'No':28},
{'No':29},
{'No':30}
]
  constructor(private params: ModalDialogParams,private api:ApiServiceService,public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }
  choosenoofdays(name){
    this.params.closeCallback(name);
  }
  close() {
    this.params.closeCallback();
}
}
