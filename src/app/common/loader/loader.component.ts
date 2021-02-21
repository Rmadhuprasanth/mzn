import { Component, OnInit } from '@angular/core';
import { Page } from "tns-core-modules/ui/page";
import { registerElement } from 'nativescript-angular/element-registry';

@Component({
  selector: 'ns-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private page: Page,) { }

  ngOnInit(): void {
    this.page.actionBarHidden = true;
  }

}
