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
  private cachedSeries = [];

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

  fetchMeasurementSeries(id: number, geo: string, freq: string, noCache: boolean) {
    if (this.cachedMeasureSeries[id + geo + freq]) {
      return observableOf(this.cachedMeasureSeries[id + geo + freq]);
    } else {
      const caching = noCache ? '&nocache' : '';
      let measureSeries$ = this.http.get(`${this.baseUrl}/measurement/series?id=${id}&geo=${geo}&freq=${freq}&expand=true${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedMeasureSeries[id + geo + freq] = val;
          measureSeries$ = null;
        }), );
      return measureSeries$;
    }
  }

  fetchSeries(name: string, start: string, noCache: boolean) {
    if (this.cachedSeries[name]) {
      return observableOf(this.cachedSeries[name]);
    } else {
      const caching = noCache ? '&nocache' : '';
      const startParam = start ? `&start=${start}` : '';
      let packageSeries$ = this.http.get(`${this.baseUrl}/series?name=${name}&u=uhero${startParam}&expand=true${caching}`, this.httpOptions).pipe(
        map(mapData),
        tap(val => {
          this.cachedSeries[name] = val;
          packageSeries$ = null;
        }),
      );
      return packageSeries$;
    }
  }
}

function mapData(response): any {
  return response.data;
}
