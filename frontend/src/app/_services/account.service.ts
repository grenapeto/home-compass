import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}`; // Adjust based on your API URL

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;
    private refreshTokenTimeout?: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue() {
        return this.accountSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${baseUrl}/login`, { email, password })
            .pipe(map(token => {
                // Store the JWT token as needed
                localStorage.setItem('jwtToken', token);
                this.startRefreshTokenTimer(); // Implement if you have token refreshing logic
                return token; // You may want to adjust how the account information is managed
            }));
    }

    logout() {
        // Assuming your backend has a route for logging out
        this.http.post<any>(`${baseUrl}/logout`, {}).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        // Update this method based on how your backend handles token refreshing
        return this.http.post<any>(`${baseUrl}/refresh-token`, {})
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email });
    }

    validateResetToken(token: string) {
        // Update this method if your backend has corresponding functionality
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    getAll() {
        // Update or remove if your backend does not support this
        return this.http.get<Account[]>(`${baseUrl}`);
    }

    getById(id: string) {
        // Update or remove if your backend does not support this
        return this.http.get<Account>(`${baseUrl}/${id}`);
    }

    update(id: string, params: any) {
        // Update or remove if your backend does not support this
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                if (account.id === this.accountValue?.id) {
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        // Update or remove if your backend does not support this
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                if (id === this.accountValue?.id) {
                    this.logout();
                }
            }));
    }

    private startRefreshTokenTimer() {
        // Implement if you have token refreshing logic
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
