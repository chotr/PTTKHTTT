import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/provider/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      account: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null),
    });
  }

  login(form: FormGroup): void {
    const objLogin = {
      taiKhoan: form.value.account,
      matKhau: form.value.password,
    };
    this.accountService.loginApi(objLogin).subscribe((res) => {
      if (res) {
        localStorage.setItem('account', JSON.stringify(res));
        window.location.reload();
      }
    });
  }

  get account(): AbstractControl | null {
    return this.loginForm.get('account');
  }
  navigateTo() {
    this.router.navigate(['/client/sign-up']);
  }
}
