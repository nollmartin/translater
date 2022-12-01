import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  email: string = '';
  name: string = '';
  dataPolicy: boolean = false;
  contactForm: FormGroup;
  disabled = false;
  tel: string = '';

  constructor(private authService: AuthService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+36-?)|0)?[0-9]{2}[-]?[0-9]{3}[-]?[0-9]{4}$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataPolicy: new FormControl(false, Validators.requiredTrue),
    });
  }

  ngOnInit() {}

  submitted() {
    const user = new User(
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.dataPolicy,
      this.contactForm.value.tel
    );
    this.authService.registration(user);
  }
}
