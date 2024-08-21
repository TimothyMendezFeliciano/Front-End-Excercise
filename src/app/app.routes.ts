import {Routes} from '@angular/router';
import {CovidDataTableComponent} from "./components/covid-data-table/covid-data-table.component";

export const routes: Routes = [
  {
    path: 'cases', component: CovidDataTableComponent
  }
];
