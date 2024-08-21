import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CasesByDate, CovidDataService} from "../../services/covid-data.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator, MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-covid-data-table',
  templateUrl: './covid-data-table.component.html',
  styleUrl: './covid-data-table.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidDataTableComponent implements OnInit, AfterViewInit {

  private _httpClient = inject(HttpClient);

  displayedColumns: string[] = ['date', 'total', 'caseType'];
  covidDataService: CovidDataService = new CovidDataService(this._httpClient);
  data: CasesByDate[] = [
    {
      "date": "1967-05-04",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "1990-09-02",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "1993-04-18",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "1995-11-09",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "1996-08-05",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-02-17",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-02-29",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-03-22",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-04-15",
      "caseType": "Confirmed",
      "total": 4
    },
    {
      "date": "2000-05-10",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-05-12",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "2000-05-21",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-05-29",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "2000-05-31",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-06-14",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "2000-06-27",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-07-21",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-07-23",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "2000-07-31",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-07-31",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "2000-08-13",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-08-16",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-08-17",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-08-20",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-08-29",
      "caseType": "Confirmed",
      "total": 1
    },
    {
      "date": "2000-09-11",
      "caseType": "Probable",
      "total": 1
    },
    {
      "date": "2000-10-31",
      "caseType": "Confirmed",
      "total": 1
    }
  ]
  dataSource: MatTableDataSource<CasesByDate> = new MatTableDataSource<CasesByDate>([]);
  pageIndex = 0;
  pageEvent: PageEvent;

  readonly range = new FormGroup<{
    start: FormControl<Date | null>
    end: FormControl<Date | null>
  }>({
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required),
    },
    {
      validators: this.dateRangeValidator
    }
  );
  isLoading = false;


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex
  }

  dateRangeValidator(control: AbstractControl) {
    const start = control.get('start')?.value;
    const end = control.get('end')?.value;
    if (start && end) {
      const diffInMs = Math.abs(end - start);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 7) {
        control.get('end')?.setErrors({
          dateRangeTooWide: true
        })
      } else {
        control.get('end')?.setErrors({
          dateRangeTooWide: false
        })
      }
    }
    return null
  }


  ngOnInit() {
    this.fetchData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    if (this.range.controls.end.hasError('dateRangeTooWide')) return
    this.isLoading = true;
    let start = this.range.get('start')?.value?.toISOString() || new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
    let end = this.range.get('end')?.value?.toISOString() || new Date().toISOString()
    if (start && end) {
      this.covidDataService.getCovidCasesByEarliestPositiveDiagnosticDate(
        start,
        end,
      )
        .pipe(debounceTime(1000))
        .subscribe((data) => {
          this.dataSource.data = data
          this.isLoading = false
        })
    }
  }
}
