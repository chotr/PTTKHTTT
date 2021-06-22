import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pass-modal',
  templateUrl: './pass-modal.component.html',
  styleUrls: ['./pass-modal.component.scss'],
})
export class PassModalComponent implements OnInit, AfterViewInit {
  @Output() outPass = new EventEmitter();
  @Input() pass: any;
  retype: any;
  passNew: any
  st: any;

  passGet = new FormGroup({
   matKhau: new FormControl(),
   newPass: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {
    // this.outPass.emit(this.passGet)
  }

  ngAfterViewInit(): void {
    if (this.passNew === this.retype) {
      this.outPass.emit(this.passNew);
      this.st = "done"
    }
  }
  getRetype(evt) {
    this.retype = evt.target.value;
  }
  getPass(evt) {
    this.passNew =  evt
   
    
  }
  
  getValue(){
    if (this.passNew === this.retype) {
      this.outPass.emit(this.passNew);
      this.st = "done"
    }
    console.log(this.passNew + "+" + this.retype + "+" +this.st)

  }
}
