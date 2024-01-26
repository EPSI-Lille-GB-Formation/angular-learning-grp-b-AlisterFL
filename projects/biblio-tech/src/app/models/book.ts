export class Book {
    static map(arg0: (book: any) => any) {
      throw new Error('Method not implemented.');
    }
    constructor(
        public id: number,
        public title: string,
        public resume: string,
        public image: string,
        public updatedAt: Date,
        public createdAt: Date,
    ){
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}