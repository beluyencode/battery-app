import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  constructor() { }

  connect() {
    this.socket = io();
  }

  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('sendTicket', (msg: any) => {
        observer.next(msg);
      });
    });
  }

  getPercent() {
    return new Observable(observer => {
      this.socket.on('sendPercent', (msg: any) => {
        observer.next(msg);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
