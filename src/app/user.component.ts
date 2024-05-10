import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user';
import { DatePipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DatePipe, NgOptimizedImage],
  template: `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 16px">
      @for (user of users; track user.id) {
        <div style="margin-bottom: 24px">
          <img [ngSrc]="user.picture.large" width="128" height="128" alt="large"/>
          <div>Gender: {{ user.gender }}</div>
          <div>Name: {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</div>
          <div>Location: {{ user.location.street.number }} {{ user.location.street.name }}, {{ user.location.city }}, {{ user.location.state }}
            , {{ user.location.country }}
          </div>
          <div>Postcode: {{ user.location.postcode }}</div>
          <div>Coordinates: {{ user.location.coordinates.latitude }}, {{ user.location.coordinates.longitude }}</div>
          <div>Timezone: {{ user.location.timezone.offset }}, {{ user.location.timezone.description }}</div>
          <div>Email: {{ user.email }}</div>
          <div>Username: {{ user.login.username }}</div>
          <div>Password: {{ user.login.password }}</div>
          <div>Date of Birth: {{ user.dob.date | date }}</div>
          <div>Age: {{ user.dob.age }}</div>
          <div>Registered Date: {{ user.registered.date | date }}</div>
          <div>Registered Age: {{ user.registered.age }}</div>
          <div>Phone: {{ user.phone }}</div>
          <div>Cell: {{ user.cell }}</div>
          <div>ID Name: {{ user.id.name }}</div>
          <div>ID Value: {{ user.id.value }}</div>
          <div>Picture Medium: {{ user.picture.medium }}</div>
          <div>Picture Thumbnail: {{ user.picture.thumbnail }}</div>
          <div>Nationality: {{ user.nat }}</div>
        </div>
      } @empty {
        Empty list of users
      }
    </div>
  `,
  // host: { ngSkipHydration: 'true' },
  providers: [UserService]
})
export class UserComponent implements OnInit, OnDestroy {
  users: Array<User> = [];

  d$ = new Subject<void>();

  constructor(private us: UserService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.us.getUsers()
        .pipe(
          takeUntil(this.d$)
        ).subscribe((data: Array<User>) => {
      this.users = data;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.d$.next();
    this.d$.complete();
  }
}
