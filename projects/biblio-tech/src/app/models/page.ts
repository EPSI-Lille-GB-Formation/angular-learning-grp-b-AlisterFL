export class Page {
    constructor(
        public id: number,
        public bookId: number,
        public title: string,
        public content: string,
        public updatedAt: Date,
        public createdAt: Date,
        public isEditing: boolean = false,
    ){
        this.createdAt = new Date();
        this.updatedAt = new Date();
      }
}