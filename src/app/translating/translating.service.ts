import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, pipe } from 'rxjs';
import { Language } from './models/language.model';

@Injectable({
  providedIn: 'root',
})
export class TranslatingService {
  private message: Object | undefined;
  constructor(private http: HttpClient, private router: Router) {}

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
}
