import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-add-movie',
  templateUrl: './form-add-movie.component.html',
  styleUrls: ['./form-add-movie.component.scss'],
})
export class FormAddMovieComponent implements OnInit {
  @Input() movie: any;
  fileToUpload: File | null = null;

  constructor() {}

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
