import { of as observableOf, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;

  constructor(
    @Inject('environment') private environment,
    private http: HttpClient
  ) {
    this.baseUrl = this.environment.apiUrl;
  }

  fetchMeasurementSeries(id: number, geo: string, freq: string, noCache: boolean): Observable<any> {
    const caching = noCache ? '&nocache' : '';
    let measureSeries$ = this.http.get(`${this.baseUrl}/measurement/series?id=${id}&geo=${geo}&freq=${freq}&expand=true${caching}`).pipe(
      map(mapData),
      tap(val => {
        measureSeries$ = null;
      }), );
    return measureSeries$;
  }

  fetchSeries(name: string, start: string, noCache: boolean) {
    const caching = noCache ? '&nocache' : '';
    const startParam = start ? `&start=${start}` : '';
    let packageSeries$ = this.http.get(`${this.baseUrl}/series?name=${name}&u=uhero${startParam}&expand=true${caching}`).pipe(
      map(mapData),
      tap(val => {
        packageSeries$ = null;
      }), );
    return packageSeries$;
  }
}

function mapData(response): any {
  return response.data;
}
