import { JoinColumn, ManyToOne } from 'typeorm';
import {CreateDateColumn, Column,  Entity,  PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Twit } from './twit.entity';

@Entity({name:"comments"})
export class TwitComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "twit_Id"})
  twit_Id: number;

  @Column({name: "commenter"})
  commenter: string;

  @Column({name: "message"})
 message: string;

  @CreateDateColumn({name: "date_Created"})
  date_Created: Date;

  @ManyToOne(() => Twit, twit => twit.twit_Id)
  @JoinColumn({name:  "twit_Id"})
  twits: Twit;
}