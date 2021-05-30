import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.scss']
})
export class PipeComponent implements OnInit {
  title = 'lop fe62'
  ngay = new Date()
  giaTien = 32525562


  constructor() { }

  ngOnInit(): void {
  }

}
