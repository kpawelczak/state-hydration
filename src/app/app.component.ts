import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { UserComponent } from './user.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, DatePipe, NgOptimizedImage, UserComponent],
  template: `
    <app-users></app-users>
  `,
  // host: { ngSkipHydration: 'true' },
})
export class AppComponent {

}
