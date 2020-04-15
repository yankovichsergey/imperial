import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class GlobalRes {
    public readonly unknownError = 'Unknown Error';
    public readonly dashboardTitle = 'Tech2SuccessAdminPanel';
    public readonly loading = 'Loading ...';
    public readonly noData = 'No Data';
    public readonly logout = 'Logout';
    public readonly profile = 'Profile';
    public readonly loadingData = 'Loading data...';
    public readonly somethingWrong = 'We are sorry, but something went wrong.';
    public readonly savedSuccess = 'Data was saved successfully';

    public readonly email = 'Email';
    public readonly firstName = 'First Name';
    public readonly lastName = 'Last Name';
    public readonly operatorName = 'Operator Name';

    public readonly address = 'Address';
    public readonly save = 'Save';
    public readonly cancel = 'Cancel';
    public readonly actions = 'Actions';
    public readonly yes = 'Yes';
    public readonly no = 'No';

    public readonly operators = 'Operators';
    public readonly users = 'Users';
}
