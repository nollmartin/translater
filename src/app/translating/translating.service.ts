import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, pipe } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Language } from './models/language.model';

@Injectable({
  providedIn: 'root',
})
export class TranslatingService {
  private _counter: number = 0;

  constructor(private http: HttpClient, private authService: AuthService) {
    const counter = localStorage.getItem('counter');
    if (counter) {
      this._counter = JSON.parse(counter);
    } else {
      localStorage.setItem('counter', JSON.stringify(this._counter));
    }
  }

  translate(q: string, source: string, target: string) {
    var formData = new FormData();
    formData.append('q', q);
    formData.append('source', source);
    formData.append('target', target);
    formData.append('format', 'text');
    return this.http.post(`/translate`, formData, { responseType: 'text' });
  }

  getLanguages() {
    return this.http.get<Language[]>(`/languages`);
  }

  getDetect(textBody: string) {
    var formData = new FormData();
    formData.append('q', textBody);
    formData.append('api_key', '');
    return this.http.post(`/detect`, formData, { responseType: 'text' });
  }

  counterOver() {
    if (!this.authService.isLoggedIn()) {
      if (this._counter > 3) {
        return false;
      }
    }
    return true;
  }

  raiseCount() {
    this._counter++;
    localStorage.setItem('counter', JSON.stringify(this._counter));
  }
}
