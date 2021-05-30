import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.scss'],
})
export class NgForComponent implements OnInit {
  studentList = [
    {
      name: 'abc',
      age: '12'
    },
    {
      name: 'def',
      age: '23'
    },
    {
      name: 'ghk',
      age: '20'
    },
    {
      name: 'lmn',
      age: '25'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
