import {NgModule} from "@angular/core";
import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {AppComponent} from "./app.component";
import {CovidDataTableComponent} from "./components/covid-data-table/covid-data-table.component";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {DatePipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatChip} from "@angular/material/chips";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  imports: [
    BrowserModule, FormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule, HttpClientModule,
    MatProgressSpinnerModule, MatTableModule, MatSortModule,
    MatPaginatorModule, DatePipe, MatFormFieldModule, MatInputModule, MatDatepickerToggle,
    MatDateRangeInput, MatDateRangePicker, ReactiveFormsModule,
    MatNativeDateModule, MatDatepickerModule, MatButton, MatAnchor, MatChip, MatToolbarModule
  ],
  declarations: [
    AppComponent,
    CovidDataTableComponent
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
})

export class AppModule {
}
