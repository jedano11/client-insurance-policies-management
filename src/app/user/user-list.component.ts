import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { IUser } from '../_models/index'

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserComponent implements OnInit {
  pageTitle: string = 'Client List';
  filteredUsers: IUser[] = [];
  users: IUser[] = [];
  errorMessage: string = '';
  p: number = 1;
  loading: boolean = false;

  _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.users;
  }

  constructor(private userService: UserService) {}

  performFilter(filterBy: string): IUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter(
      (user: IUser) =>
        user.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users.clients;
        this.filteredUsers = this.users;
        this.loading = false;
      },
      error: error => (this.errorMessage = error)
    });
  }
}
