import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { isPlatformServer } from '@angular/common';


@Injectable()
export class UserService {
  private apiUrl = 'https://randomuser.me/api/?results=1000';

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object,
              private transferState: TransferState) {
  }

  getUsers(): Observable<any> {
    // return this.getWithTransfer();
    return this.get();
  }

  private getWithTransfer() {
    const usersKey = makeStateKey<any>('users');

    if (isPlatformServer(this.platformId)) {
      return this.get().pipe(
        tap(users => {
          this.transferState.set(usersKey, users);
        })
      );
    } else {
      if (this.transferState.hasKey(usersKey)) {
        const users = this.transferState.get<any>(usersKey, []);
        this.transferState.remove(usersKey);
        return of(users);
      } else {
        return this.get();
      }
    }
  }

  private get(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
               .pipe(
                 map(users => users.results),
                 tap((u) => {
                   console.log('requested: ', u[0].name);
                 })
               );
  }
}
