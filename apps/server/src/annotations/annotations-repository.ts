import { Annotation } from '@koinsight/common/types/annotation';
import { db } from '../knex';

export class AnnotationsRepository {
  static async getByBookMD5(book_md5: string): Promise<Annotation[]> {
    return db<Annotation>('annotation').where({ book_md5 }).select('*');
  }
}
