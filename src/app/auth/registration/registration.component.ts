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

  constructor(private authService: AuthService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dataPolicy: new FormControl(false, Validators.requiredTrue),
    });
  }

  ngOnInit() {}

  submitted() {
    const user = new User(
      this.contactForm.value.name,
      this.contactForm.value.email,
      true
    );
    this.authService.registration(user);
  }
}
