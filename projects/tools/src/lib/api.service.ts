import { of as observableOf, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string;
  private headers: HttpHeaders;
  private httpOptions;
  private cachedMeasureSeries = [];

  constructor(
    @Inject('environment') private environment,
    private http: HttpClient
  ) {
    this.baseUrl = this.environment.apiUrl;
    this.headers = new HttpHeaders({});
    this.headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M='
      })
    };
  }

  fetchMeasurementSeries(id: number, noCache: boolean) {
    if (this.cachedMeasureSeries[id]) {
      return observableOf(this.cachedMeasureSeries[id]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let measureSeries$ = this.http.get(`${this.baseUrl}/measurement/series?id=${id}&expand=true${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedMeasureSeries[id] = val;
          measureSeries$ = null;
        }), );
      return measureSeries$;
    }
  }
}

function mapData(response): any {
  return response.data;
}
