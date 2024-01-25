export class Book {
    constructor(
        public id: number,
        public title: string,
        public resume: string,
        public image: string,
        public updateAt: Date,
        public createdAt: Date,
    ){
        this.createdAt = new Date();
        this.updateAt = new Date();
    }
}