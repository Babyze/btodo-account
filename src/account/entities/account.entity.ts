import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  accountID: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedDate: Date;
}
