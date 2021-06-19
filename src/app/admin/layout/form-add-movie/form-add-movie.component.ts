import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-add-movie',
  templateUrl: './form-add-movie.component.html',
  styleUrls: ['./form-add-movie.component.scss'],
})
export class FormAddMovieComponent implements OnInit {
  @Input() movie: any;
  @Output() private newItemEvent = new EventEmitter();
  @Output() private outForm = new EventEmitter();
  @Input() isDisabled: boolean;

  movies = new FormGroup({
    maPhim: new FormControl(),
    tenPhim: new FormControl(),
    biDanh: new FormControl(),
    trailer: new FormControl(),
    hinhAnh: new FormControl(),
    moTa: new FormControl(),
    ngayKhoiChieu: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {
    this.outForm.emit(this.movies);
  }

  handleFileInput(files: FileList) {
    // this.newItemEvent.emit(files.item(0));
    this.movie.hinhAnh = files.item(0);
  }
}
