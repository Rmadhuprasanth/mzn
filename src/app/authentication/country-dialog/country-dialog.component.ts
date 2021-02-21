import { Component, OnInit } from '@angular/core';
import { ListViewEventData } from "nativescript-ui-listview"
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { ApiServiceService } from '~/app/endpoint/api-service.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { EnANdAeJson } from '~/app/endpoint/En-Ae.service';
@Component({
  selector: 'ns-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
}) 
export class CountryDialogComponent implements OnInit {
  lang='English'
  aedata;
  countries: any;
  imageurl: string;

  constructor(private params: ModalDialogParams,private api:ApiServiceService,private router: RouterExtensions, public aetext:EnANdAeJson) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
    this.getaedat()
    this.imageurl=this.api.imageurl+'Flags/'
    this.getcountry()
  }
  getaedat(){
    this.aedata=this.aetext.getArabicConent()
  }

  getcountry() {
    this.api.getcountry().subscribe((result) => {
          console.log('re',result)
          this.countries=result['Result']
        }, (error) => { 
            console.log(error); 
        });
}
  

  close(id) {
    // this.router.navigate(['/Login'],{queryParams:{"flag":flag,"code":code,"Id":id}})
    this.params.closeCallback(id);
}
onItemSelecting(args: ListViewEventData): void {
  console.log(args.view.bindingContext.name);
  args.returnValue = args.index > 5;
}
}
