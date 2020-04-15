import * as alertify from 'alertifyjs';
import { GlobalRes } from '@appTextResources';
export function alertifyError(response: any) {
    if (response.status !== 401 && response.status !== 403) {
        if (response.status === 422) {
            alertify.error(response.error);
        } else {
            alertify.error(new GlobalRes().unknownError);
        }
    }
}
