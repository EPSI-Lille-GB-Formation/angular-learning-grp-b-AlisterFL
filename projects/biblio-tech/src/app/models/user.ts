export class User {
    constructor(
        public id: string,
        public firstname: string,
        public lastname: string,
        public mail: string,
        public password: string,
        public role: boolean,
    ){  }
}