import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-tandc',
  templateUrl: './tandc.component.html',
  styleUrls: ['./tandc.component.css']
})
export class TandcComponent implements OnInit {
  lang='English'

  constructor(public router:RouterExtensions,) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('Language')
  }
  goBack(){
    this.router.navigate(['/homenew'])
  }
}
