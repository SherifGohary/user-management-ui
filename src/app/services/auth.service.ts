import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth_token';
const USER_DETAILS = 'user_details'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = "https://localhost:44393/api"
  private loggedIn = false;

  constructor(private httpService: HttpService, private router: Router) { }

  async login(username: string, password: string): Promise<boolean> {
    const data = {
      Username: username,
      Password: password,
      RememberMe: true
    }
    await this.httpService.post(this.baseURL + "/Account/Login", data).subscribe(response => {
      console.log({ response });
      const result = response as any
      if (result.isAuthenticated) {
        this.setToken(result.token);
        this.setUserDetails(result.userDetails);
        this.loggedIn = true;
        this.router.navigate(['/dashboard']);
      }
    },
      error => {
        console.log({ error })
      });
    return this.loggedIn;
  }

  async register(user: any) {
    await this.httpService.post(this.baseURL + "/Account/Register", user).subscribe(response => {
      console.log({ response });
      const result = response as any
      this.router.navigate(['/login']);
    },
      error => {
        console.log({ error })
      });
  }

  logout(): void {
    this.removeToken();
    this.removeUserDetails();
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (this.getToken()) this.loggedIn = true;
    return this.loggedIn;
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  private setUserDetails(userDetails: any): void {
    localStorage.setItem(USER_DETAILS, JSON.stringify(userDetails));
  }

  private removeUserDetails(): void {
    localStorage.removeItem(USER_DETAILS);
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem(USER_DETAILS) as string);
  }
}
