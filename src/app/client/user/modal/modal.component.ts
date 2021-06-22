import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() user: any;

  @Output() outputFormEdt = new EventEmitter()

  userForm = new FormGroup({
    email: new FormControl(),
    hoTen: new FormControl(),
    soDt: new FormControl(),
  })
  constructor() { }

  ngOnInit(): void {
    this.outputFormEdt.emit(this.userForm)
    
    
  }
  getConsole(){
    console.log(this.user.email)
  }

}
