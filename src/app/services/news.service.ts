import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError, map, tap, throwError, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http : HttpClient ) { }

  getTopHeadlineProp: ReplaySubject<any> = new ReplaySubject<any>()


  public setTopheadline(data : any){
    this.getTopHeadlineProp.next(data)
  }

  public getTopheadline(){
    return this.getTopHeadlineProp.asObservable()
  }


  getCountry() {

  }



  getTopheadlines( pageSize: number, page: number): Observable<any>  {

      return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=${environment.apiKey}`).pipe(
        tap((result) => {
          // this.setTopheadline(result)
          return result
      }),
      catchError((error: any) => {
        return throwError(error)
    })
    )
      

  }


  searchArticles(searchPhrase: string, pageSize: number, page: number): Observable<any> {
    return this.http.get(`https://newsapi.org/v2/everything?q=${searchPhrase}&page=${page}&pageSize=${pageSize}&apiKey=${environment.apiKey}`).pipe(
      tap((result) => {
        return result
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }


 


}
