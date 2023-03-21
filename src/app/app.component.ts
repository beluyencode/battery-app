import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { faBoltLightning, fas } from '@fortawesome/free-solid-svg-icons';
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
  build = faBuilding;
  tranformWidth = 0;
  startPositon = 0;
  widthScreen = window.innerWidth;
  cancelTransition = false;
  isResave = false;


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

  touchmove(event: any) {
    event.stopPropagation();
    const position = this.startPositon - event.touches[0].clientX;
    if (position <= this.widthScreen && position >= 0) {
      if (this.isResave) {
        this.tranformWidth = position;
      }
    }
    if (position >= -this.widthScreen && position < 0) {
      if (!this.isResave) {
        this.tranformWidth = this.widthScreen - Math.abs(position);
      }
    }

  }

  touchStart(event: any) {
    event.stopPropagation();
    this.startPositon = event.touches[0].clientX;
    this.cancelTransition = true;
    if (this.tranformWidth !== 0) {
      this.isResave = false;
    } else {
      this.isResave = true;
    }
  }

  touchend(event: any) {
    event.preventDefault();
    if (this.tranformWidth > this.widthScreen / 2.5) {
      if (this.isResave) {
        this.tranformWidth = this.widthScreen;
      } else {
        if (this.tranformWidth !== this.widthScreen) {
          this.tranformWidth = 0;
        }
      }
    } else {
      this.tranformWidth = 0;
    }
    this.cancelTransition = false;
  }

}
