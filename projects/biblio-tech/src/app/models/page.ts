export class Page {
    constructor(
        public id: number,
        public book_id: number,
        public title: string,
        public content: string,
        public updateAt: Date,
        public createdAt: Date,
    ){
        this.createdAt = new Date();
        this.updateAt = new Date();
      }
}