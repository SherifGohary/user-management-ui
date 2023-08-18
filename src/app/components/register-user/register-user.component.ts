import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  user: any = {};
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.pattern(/^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/)],
      website: ['', Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.registrationForm);
    console.log(this.registrationForm.get('name')?.hasError('required'));
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      this.authService.register(user);
    }
  }
}
