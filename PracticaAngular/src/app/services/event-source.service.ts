import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {
  private subject = new Subject<MessageEvent>();

  constructor() { }

  getEvents(url: string): Observable<MessageEvent> {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      this.subject.next(event);
    };

    eventSource.onerror = (error) => {
      this.subject.error(error);
    };

    return this.subject.asObservable();
  }
}
