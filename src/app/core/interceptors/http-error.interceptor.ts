import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * Cross-cutting HTTP error handling. Errors are never swallowed: they are
 * logged for diagnostics and re-thrown so the calling screen can surface a
 * typed error state to the user.
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const detail = error.error?.description ?? error.message;
      console.error(`[HTTP] ${req.method} ${req.url} failed: ${detail}`);
      return throwError(() => error);
    })
  );
