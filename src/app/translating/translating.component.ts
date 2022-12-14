import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Language } from './models/language.model';
import { TranslatingService } from './translating.service';

@Component({
  selector: 'app-translating',
  templateUrl: './translating.component.html',
  styleUrls: ['./translating.component.scss'],
})
export class TranslatingComponent implements OnInit {
  langs: Language[] = [];
  transForm: FormGroup;
  source: string = '';
  target: string = '';
  transText: string = '';
  transedText: string = '';
  language: string = '';
  isLoading = false;

  constructor(
    private translatingService: TranslatingService,
    private router: Router
  ) {
    this.isLoading = true;
    this.translatingService.getLanguages().subscribe((langs) => {
      this.langs = langs;
      this.isLoading = false;
    });

    this.transForm = new FormGroup({
      source: new FormControl('detect'),
      target: new FormControl('en'),
      transText: new FormControl('', [Validators.required]),
      transedText: new FormControl({ value: '', disabled: true }),
    });
  }

  ngOnInit(): void {}

  submitted() {
    this.isLoading = true;
    if (this.transForm.value.source == 'detect') {
      this.translatingService
        .getDetect(this.transForm.value.transText)
        .subscribe(
          (response) => {
            this.translate(JSON.parse(response)[0].language);
          },
          (error) => {
            alert(`${JSON.parse(error)[0].error}`);
            this.isLoading = false;
          }
        );
    } else {
      this.translate(this.transForm.value.source);
    }
  }

  private translate(_source: string) {
    if (!this.translatingService.counterOver()) {
      this.isLoading = false;
      this.router.navigateByUrl('registration');
    }
    this.translatingService
      .translate(
        this.transForm.value.transText,
        _source,
        this.transForm.value.target
      )
      .subscribe(
        (response) => {
          this.transedText = JSON.parse(response).translatedText;
          this.language = _source;
          this.translatingService.raiseCount();
          this.isLoading = false;
        },
        (error) => {
          alert(`${JSON.parse(error.error).error}`);
          this.isLoading = false;
        }
      );
  }
}
