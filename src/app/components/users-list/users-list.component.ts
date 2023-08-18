import { Component, OnInit } from '@angular/core';
import { UsersListService } from 'src/app/services/users-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: any[] = [];

  constructor(private usersListService: UsersListService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersListService.getAllUsers().subscribe(response => {
      this.users = (response as any);
      console.log("this.users", this.users);
    },
    error => {
      console.log({error});
      console.log({status:error.status});
    });
  }

}
