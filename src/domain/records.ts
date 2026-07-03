export class Record {
  id: number;
  title: string;
  time: number;

  constructor(id: number, title: string, time: number) {
    this.id = id;
    this.title = title;
    this.time = time;
  }
}
