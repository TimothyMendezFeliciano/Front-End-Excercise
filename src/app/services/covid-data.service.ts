import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export interface CasesByDate {
  date: string;
  caseType: "Probable" | "Confirmed";
  total: number
}

@Injectable({
  providedIn: 'root'
})

enum ENDPOINTS {
  base = 'http://localhost:4200',
  cases = "/cases/covid-19/grouped-by-earliest-positive-diagnostic-date"
}

export class CovidDataService {

  constructor(private http: HttpClient) {
  }

  getCovidCasesByEarliestPositiveDiagnosticDate(startDate: string, endDate: string): Observable<CasesByDate[]> {
    let params = new HttpParams().set("startDate", startDate).set("endDate", endDate);

    return this.http.get<CasesByDate[]>(ENDPOINTS.base + ENDPOINTS.cases, {params});
  }
}
