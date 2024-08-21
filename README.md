# FrontEndExcercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# COVID-19 Cases Data Application

This Angular application is designed to fetch and display COVID-19 case data from a specified API. The application implements a service to handle API requests, displays the data in a table with pagination, and allows the user to select a date range with a date picker. Additionally, it features a loading spinner and input debouncing/throttling for an enhanced user experience.

## Exercise Requirements

### 1. Setup Angular Application

- Create a new Angular application using the Angular CLI.

### 2. API Documentation

- For documentation on the API endpoint, please use the following link: [API Documentation](https://biostatistics.salud.pr.gov/swagger/index.html).

### 3. Create a Service

- Create a new service that handles making HTTP requests to the API endpoint:  
  `https://biostatistics.salud.pr.gov/cases/covid-19/grouped-by-earliest-positive-diagnostic-date`
- The API endpoint should return data in the following format:
  ```json
  [
    {
      "date": "2023-08-14",
      "caseType": "confirmed",
      "total": 24
    }
  ]

## 4. Create a Component to Display Data

- Develop a new Angular component that displays the downloaded data in a table.
- Ensure that the table includes all properties from the API response, such as the date, case type, and total number of cases.
- The table should be designed for clear and concise presentation of the data.

## 5. Implement a Loading Spinner

- Add a loading spinner to the component to indicate when data is being fetched from the API.
- The spinner should be visible while the data is being downloaded and should automatically hide when the data has finished loading.
- This enhances the user experience by providing visual feedback during data loading operations.

## 6. Add Pagination to the Table

- Implement pagination in the table to ensure that only 10 rows of data are displayed at a time.
- This helps in managing large data sets by breaking the data into manageable chunks.
- Ensure that the pagination controls are intuitive and easy to use.

## 7. Create a TypeScript Interface

- Define a TypeScript interface `CaseByDate` that matches the structure of the data returned by the API.
- This interface will help in type-checking and ensuring that the data conforms to the expected structure.

### Example of the `CaseByDate` interface:

```typescript
export interface CaseByDate {
  date: string;
  caseType: string;
  total: number;
}
```

## 8. Integrate a Date Range Picker

- **Add a Date Range Picker:**
  - Integrate a date range picker component from the Angular Material library into the user interface.
  - The date range picker should allow users to select a start date and an end date, which will be used to filter the COVID-19 data by the sample collection date.

- **Validation Mechanism:**
  - Implement a validation mechanism that ensures the selected date range does not exceed one week.
  - If the user selects a date range longer than a week, an error should be displayed, and the form should be invalid.
  - This feature helps users focus on specific, manageable time frames when viewing the data.

## 9. Update Service with Query Parameters

- **Modify the Service:**
  - Update the existing service to append `startDate` and `endDate` as query parameters in the request URL.
  - This modification will allow the API requests to filter the data based on the selected date range, providing more relevant results to the user.

- **Example URL:**
  - After appending the query parameters, the URL should look like this:
  ```plaintext
  https://biostatistics.salud.pr.gov/cases/covid-19/grouped-by-earliest-positive-diagnostic-date?startDate=2023-08-01&endDate=2023-08-07

## 10. Add Debouncing/Throttling to Input Fields

- **Implement Debouncing/Throttling:**
  - Integrate debouncing or throttling mechanisms on the input fields that trigger API requests. This is particularly useful for fields where users might input data rapidly, such as search boxes or date pickers.

- **Purpose:**
  - The primary purpose of debouncing or throttling is to limit the number of API requests made within a short period. This helps to prevent performance issues, such as server overload or unnecessary network traffic, that could arise from making too many requests too quickly.

- **Debouncing:**
  - Debouncing ensures that an API request is only made after the user has stopped typing or interacting with the input field for a specified duration (e.g., 300ms). If the user continues typing before the duration is over, the timer resets, and the API request is delayed until the user stops.

- **Benefits:**
  - Debouncing improves the efficiency of API requests by reducing the number of calls made, which can enhance the overall performance and responsiveness of the application.

- **Example Implementation:**
  ```typescript
  import { debounceTime } from 'rxjs/operators';

  this.searchInput.valueChanges.pipe(
    debounceTime(300) // 300ms debounce time
  ).subscribe(value => {
    // Make the API request here
  });

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
