import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  baseURL: string = "https://localhost:44393/api"

  constructor(private httpService: HttpService) { }

  getAllUsers() {
    return this.httpService.get(this.baseURL + "/user");
  }
}
