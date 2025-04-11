import { Component } from '@angular/core';
import { BatchResult } from './models/entity.model';
import { CommonModule } from '@angular/common';
import { TimestampDemoComponent } from "./components/timestamp-demo/timestamp-demo.component";
import { UuidDemoComponent } from "./components/uuid-demo/uuid-demo.component";
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { InputTextModule } from 'nzrm-ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TimestampDemoComponent,
    UuidDemoComponent,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggered', [
      transition(':enter', [
        query('.stagger-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'UUID vs Timestamp Collision Demo';
  requestCount: number = 1000;
  uuidResults: BatchResult | null = null;
  timestampResults: BatchResult | null = null;
  Math = Math;

  onRequestCountChange(value: number) {
    this.requestCount = value;
  }

  onUuidResults(results: BatchResult): void {
    this.uuidResults = results;
  }

  onTimestampResults(results: BatchResult): void {
    this.timestampResults = results;
  }
}
