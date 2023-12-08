export class Todo {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public author: string,
        public isCompleted: boolean,
        public createdAt: Date,
        public completedAt: Date|null
    ){
        this.createdAt = new Date();
    }
}