import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity, BatchResult } from '../models/entity.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TimestampEntityService {
    private apiUrl = `${environment.server}timestamp-entity`;

    constructor(private http: HttpClient) { }

    create(): Observable<Entity> {
        return this.http.post<Entity>(this.apiUrl, {});
    }

    createBatch(count: number): Observable<BatchResult> {
        return this.http.post<BatchResult>(`${this.apiUrl}/batch?count=${count}`, {});
    }

    getAll(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.apiUrl);
    }

    getCount(): Observable<{ count: number }> {
        return this.http.get<{ count: number }>(`${this.apiUrl}/count`);
    }

    clear(): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/clear`);
    }
}