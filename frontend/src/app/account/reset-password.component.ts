import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

enum TokenStatus {
  Validating,
  Valid,
  Invalid,
}

@Component({ templateUrl: 'reset-password.component.html' })
export class ResetPasswordComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token?: string;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );

    this.token = this.route.snapshot.queryParams['token'];

        if (this.token) {
            this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

            this.accountService.validateResetToken(this.token)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.tokenStatus = TokenStatus.Valid;
                    },
                    error: () => {
                        this.tokenStatus = TokenStatus.Invalid;
                    }
                });
        } else {
            // Handle the case where token is undefined
            this.tokenStatus = TokenStatus.Invalid;
            // Optionally, you can redirect the user or show an error message
        }
    }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .resetPassword(this.token!, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            'Password reset successful, you can now login',
            { keepAfterRouteChange: true }
          );
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
