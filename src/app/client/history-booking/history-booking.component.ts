import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/provider/services/account.service';
import { CinemasService } from '../services/cinemas.service';

@Component({
  selector: 'app-history-booking',
  templateUrl: './history-booking.component.html',
  styleUrls: ['./history-booking.component.scss']
})
export class HistoryBookingComponent implements OnInit {
  userName: any;
  arr = []
  p=1
  arrHistory = []
  public responsive: boolean = true;

  constructor(private cinema: CinemasService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccount();
    this.getDataHistory();
  }
  getAccount(){
    const account = JSON.parse(localStorage.getItem('account') as string);
    if (account !== null) {
      this.userName = account.taiKhoan;
    }
  }
  getDataHistory(){
    const obj = {
      taiKhoan: this.userName,
    }
    this.accountService.detailUser(obj).subscribe((res)=>{
      if(res){
        this.hideloader();
      }
      for(let ele of res.thongTinDatVe) {
        this.arr.push(ele);
      }
      this.arrHistory = this.arr.reverse()

      
    })
  }
  hideloader(){
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('history_booking').style.display = 'block';

  }

}
