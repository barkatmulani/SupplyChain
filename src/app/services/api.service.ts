import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Global } from "../../global";
import { Injectable } from "@angular/core";
import { tap, catchError, map } from "rxjs/operators";

@Injectable()
export abstract class ApiService {
    constructor(protected http: HttpClient,
                private entity: string) {
    }

    public getAll(): Observable<any> {
        return this.http.get(Global.apiUrl + this.entity)
          // .pipe(
          //   tap(data => console.log(data)),
          //   catchError(this.handleError)
          // );
    }

    public get(id: number): Observable<any> {
        return this.http.get(Global.apiUrl + this.entity + '/' + id);
    }

    public post(record: any): Observable<any> {
        return this.http.post(Global.apiUrl + this.entity, record);
    }

    public put(id: number, record: any): Observable<any> {
        return this.http.put(Global.apiUrl + this.entity + '/' + id, record).pipe(
            tap(data => console.log(data)),
            catchError(this.handleError)
          );;
    }

    public delete(id: number): Observable<any> {
        return this.http.get(Global.apiUrl + this.entity + '/' + id);
        return this.http.delete(Global.apiUrl + this.entity + '1/' + id);
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
      }    
}



