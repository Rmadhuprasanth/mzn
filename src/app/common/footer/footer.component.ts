import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  selectedindexval:any;
tabval:0
  constructor(private router: RouterExtensions,) { }
 
  ngOnInit(): void {
  } 
  selectedindex(val){
    if(val=='0'){

      this.router.navigate(['/homenew'])  
      this.selectedindexval='0'
    }else if(val=='1'){
      this.router.navigate(['/StorelistComponent']) 
      this.selectedindexval='1'
    }
  } 
}
