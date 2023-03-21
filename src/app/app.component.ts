import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  percent = 0;
  ticket: any;
  icon = faBoltLightning;
  cloud = faCloud;
  build = faBuilding
  constructor(private serive: SocketService) { }

  ngOnInit(): void {
    this.serive.connect();

    if (!localStorage.getItem('ticket')) {
      this.serive.socket.emit('login', 1);
    } else {
      this.ticket = localStorage.getItem('ticket');
      this.serive.socket.emit('login', 0);
    }

    this.serive.onNewMessage().subscribe((res: any) => {
      localStorage.setItem('ticket', res);
      this.ticket = res;
    });

    this.serive.getPercent().subscribe((res: any) => {
      this.percent = res;
    })

    // const count = timer(1000, 500).subscribe(() => {
    //   if (this.percent < 100) {
    //     this.percent += 1;
    //   } else {
    //     count.unsubscribe();
    //   }
    // })
  }



}
