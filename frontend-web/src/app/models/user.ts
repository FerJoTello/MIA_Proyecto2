export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    country: string;

    constructor(email: string, password: string, firstName: string, lastName: string, birthDate: Date, country: string) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.country = country;
    }
}