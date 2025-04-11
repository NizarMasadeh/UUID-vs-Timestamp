import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BatchResult } from '../../models/entity.model';
import { TimestampEntityService } from '../../services/timestamp-entity.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'nzrm-ng';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ButtonComponent } from "../ui/button/button.component";

@Component({
  selector: 'app-timestamp-demo',
  imports: [
    CommonModule,
    ButtonModule,
    ButtonComponent
  ],
  templateUrl: './timestamp-demo.component.html',
  styleUrl: './timestamp-demo.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class TimestampDemoComponent implements OnChanges {
  @Input() requestCount = 1000;
  @Output() resultsEmitter = new EventEmitter<BatchResult>();

  loading = false;
  results: BatchResult | null = null;
  totalEntities = 0;
  progressValue = 0;
  progressInterval: any;
  currentRequestCount: number;

  constructor(private timestampEntityService: TimestampEntityService) {
    this.currentRequestCount = this.requestCount;
    this.updateCount();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['requestCount']) {
      this.currentRequestCount = changes['requestCount'].currentValue;
    }
  }

  updateCount(): void {
    this.timestampEntityService.getCount().subscribe(data => {
      this.totalEntities = data.count;
    });
  }

  runTest(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.progressValue = 0;

    this.progressInterval = setInterval(() => {
      if (this.progressValue < 95) {
        this.progressValue += Math.random() * 5;
      }
    }, 100);

    this.timestampEntityService.createBatch(this.currentRequestCount).subscribe({
      next: (result) => {
        clearInterval(this.progressInterval);
        this.progressValue = 100;

        setTimeout(() => {
          this.results = result;
          this.resultsEmitter.emit(result);
          this.updateCount();
          this.loading = false;
        }, 500);
      },
      error: (error) => {
        clearInterval(this.progressInterval);
        console.error('Error running test:', error);
        this.loading = false;
      }
    });
  }

  clear(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.timestampEntityService.clear().subscribe({
      next: () => {
        this.results = null;
        this.updateCount();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error clearing data:', error);
        this.loading = false;
      }
    });
  }
}
