import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OperatorsRes {
    public readonly listTitle = 'Operators List';
    public readonly editOperator = 'Edit Operator';
    public readonly createOperator = 'Create Operator';
    public readonly operatorName = 'Operator Name';
    public readonly swCode = 'SW Code';
    public readonly connectionString = 'Connection String';
    public readonly integratedApplication = 'Integrated Application';
    public readonly isAvailableDashboard = 'Dashboard';
    public readonly isAvailableWebStore = 'WebStore';
    public readonly dashboardAvailable = 'Dashboard Available';
    public readonly webStoreAvailable = 'WebStore Available';
    public readonly errors = {
        operatorNameIsRequired: 'Operator Name is required',
        swCodeIsRequired: 'SW Code is required'
    };

}
