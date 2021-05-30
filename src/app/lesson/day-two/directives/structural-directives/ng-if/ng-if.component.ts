import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-if',
  templateUrl: './ng-if.component.html',
  styleUrls: ['./ng-if.component.scss']
})
export class NgIfComponent implements OnInit {
  flat= true;

  constructor() { }

  ngOnInit(): void {
  }

  createDiv(): void {
    this.flat = true;
  }

  collapseDiv(): void {
    this.flat = false;
  }

}
