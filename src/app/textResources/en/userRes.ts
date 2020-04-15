import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserRes {
    public readonly password = 'Password';
    public readonly userProfile = 'User Profile';
    public readonly email = 'Email';
    public readonly workPhone = 'Work Phone';
    public readonly mobilePhone = 'Mobile Phone';
    public readonly firstName = 'First Name';
    public readonly lastName = 'Last Name';
    public readonly changePassword = 'Change Password';
    public readonly confirmPassword = 'Confirm Password';
    public readonly currentPassword = 'Current Password';
    public readonly listTitle = 'Users List';
    public readonly editUser = 'Edit User';
    public readonly createUser = 'Create User';
    public readonly operatorName = 'Operator Name';
    public readonly enabled = 'Enabled';
    public readonly requireToChangePassword  = 'Require to Change Password';
    public readonly errors = {
        emailIsRequired: 'Email is required',
        operatorNameIsRequired: 'Operator Name is required',
        passwordIsRequired: 'Password is required',
        emailIsNotValid: 'Email is not valid',
        passwordIsNotValid: 'Password must be between 8 - 32 characters long and include at least 1 alphabet letter and 1 digit number',
        passwordDontMatch: 'Password does not match'
    };
}
