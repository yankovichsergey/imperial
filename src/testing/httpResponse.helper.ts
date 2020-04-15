import { HttpErrorResponse } from '@angular/common/http';

export class HttpResponseHelper {

  public static errorResponseMessage = 'test 404 error';

  public static errorResponse(): HttpErrorResponse {
    return new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
  }
}
