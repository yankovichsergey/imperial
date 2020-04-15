import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationRes {
    public readonly accessDenied = 'There is no user with sent credentials';
    public readonly login = 'Login';
    public readonly username = 'Username';
    public readonly password = 'Password';
    public readonly usernameIsRequired = 'Username is required';
    public readonly passwordIsRequired = 'Password is required';
}
