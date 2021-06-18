import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit,AfterViewInit {
  states = [
    { name: 'KhachHang', abbrev: 'KhachHang' },
    { name: 'QuanTri', abbrev: 'QuanTri' },
  ];
  @Output() outSelect = new EventEmitter();

  @Input() user: any;

  @ViewChild('form') formTag: NgForm

  @Output() formElement = new EventEmitter();

  regexEmail =
  '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i';


  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.formTag);
  }

  ngOnInit(): void {
  }
  getValue(evt: any):void {
    this.outSelect.emit(evt.target.value);
  }
  getForm(form: any) {
    const { value } = form;
    const signUp = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: 'GP09',
      maLoaiNguoiDung: value.maLoaiNguoiDung.name,
      hoTen: value.name,
    };
    this.formElement.emit(signUp)
  }
  

}
