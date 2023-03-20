import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  percent = 0;
  icon = faBoltLightning;
  cloud = faCloud;
  build = faBuilding

  ngOnInit(): void {
    const count = timer(1000, 500).subscribe(() => {
      if (this.percent < 100) {
        this.percent += 1;
      } else {
        count.unsubscribe();
      }
    })
  }

}
