import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SortDirection} from "@angular/material/sort";

export interface CasesByDate {
  date: string;
  caseType: "Probable" | "Confirmed";
  total: number
}

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private apiUrl = "http://localhost:4200/cases/covid-19/grouped-by-earliest-positive-diagnostic-date";

  constructor(private http: HttpClient) {
  }

  getCovidCasesByEarliestPositiveDiagnosticDate(startDate: string, endDate: string): Observable<CasesByDate[]> {
    let params = new HttpParams().set("startDate", startDate).set("endDate", endDate);

    return this.http.get<CasesByDate[]>(this.apiUrl, {params});
  }
}
