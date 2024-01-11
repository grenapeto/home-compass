import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;

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
            .pipe(map(account => {
                this.accountSubject.next(account);
                return account;
            }));
    }

    refreshToken() {
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout() {
        // Adjust this according to your backend, if you have a logout endpoint
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    // Remove refreshToken method if not applicable

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    updateAccountSubject(updatedAccount: Account, id: string) {
        const currentAccount = this.accountValue;
        if (currentAccount && currentAccount.id === id) {
            // Update the current account
            const newAccount = { ...currentAccount, ...updatedAccount };
            this.accountSubject.next(newAccount);
        }
    }

    verifyEmail(token: string) {
        return this.http.post(`${environment.apiUrl}/verify-email`, { token });
    }

    // Add or adjust methods like verifyEmail if you have them in your backend

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/password-reset`, { email });
    }

    resetPassword(token: string, password: string) {
        return this.http.post(`${environment.apiUrl}/password-reset/${token}`, { password });
    }

    validateResetToken(token: string) {
        return this.http.post(`${environment.apiUrl}/password-reset/validate`, { token });
    }

    getAll() {
        return this.http.get<Account[]>(`${baseUrl}/accounts`);
    }

    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/accounts/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/accounts/${id}`, params)
            .pipe(map((account: any) => {
                // update the current account if it was updated
                if (account.id === this.accountValue?.id) {
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/accounts/${id}`)
            .pipe(map(() => {
                if (id === this.accountValue?.id) {
                    this.logout();
                }
            }));
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

     // helper methods

     private refreshTokenTimeout?: any;

     private startRefreshTokenTimer() {
         // parse json object from base64 encoded jwt token
         const jwtBase64 = this.accountValue!.jwtToken!.split('.')[1];
         const jwtToken = JSON.parse(atob(jwtBase64));
 
         // set a timeout to refresh the token a minute before it expires
         const expires = new Date(jwtToken.exp * 1000);
         const timeout = expires.getTime() - Date.now() - (60 * 1000);
         this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
     }
 
     private stopRefreshTokenTimer() {
         clearTimeout(this.refreshTokenTimeout);
     }

}