import { ISession } from 'connect-typeorm';
import {
  Entity,
  Column,
  Index,
  PrimaryColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
  @Index()
  @Column('bigint')
  public expiredAt = Date.now();

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';

  @DeleteDateColumn() // Añadir esta columna para soportar soft delete
  deletedAt?: Date;
}
 