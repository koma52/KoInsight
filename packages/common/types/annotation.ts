import { Book } from './book';
import { Device } from './device';

export type KoReaderAnnotation = {
  chapter: string;
  color: string;
  datetime: string;
  datetime_updated?: string;
  drawer: string;
  page: string;
  pageno: number;
  pos0: string;
  pos1: string;
  text: string;
  note?: string;
};

export type Annotation = KoReaderAnnotation & {
  device_id: Device['id'];
  book_md5: Book['md5'];
};

export type DbAnnotation = Annotation & {
  id: number;
};
