import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | undefined>(undefined);
  private readonly loggedInUserKey = 'loggedInUser';
  constructor(private router: Router) {
    const user = localStorage.getItem(this.loggedInUserKey);
    if (user) {
      this._currentUser.next(JSON.parse(user));
    }
  }

  isLoggedIn() {
    return this._currentUser.getValue() !== undefined;
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }

  registration(user: User) {
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
    this._currentUser.next(user);
    this.router.navigateByUrl('');
  }
}
