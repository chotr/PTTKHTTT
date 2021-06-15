import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  states = [
    { name: 'KhachHang', abbrev: 'Khách hàng' },
    { name: 'QuanTri', abbrev: 'Quản trị' },
  ];

  @Input() user: any;


  constructor() { }

  ngOnInit(): void {
  }

}
