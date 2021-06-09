import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { SignUpComponent } from '../../client/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root',
})
export class DeactiveGuard implements CanDeactivate<SignUpComponent> {
  canDeactivate(component: SignUpComponent): boolean {
    const flat = component.isSubmitedForm();
    if (flat) {
      return true;
    }

    const confirm = window.confirm('Thoát ?');
    return confirm ? true : false;
  }
}
