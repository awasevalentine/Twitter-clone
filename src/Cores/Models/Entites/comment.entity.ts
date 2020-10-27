import {CreateDateColumn, Column,  Entity,  PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Twit } from './twit.entity';

@Entity({name:"comments"})
export class TwitComment {
  @PrimaryGeneratedColumn()
  comment_Id: number;

  @Column({name: "Twit_Id"})
  twit_Id: string;

  @Column({name: "Commenter"})
  commenter: string;

  @Column({name: "Content"})
 content: string;

  @Column({name: "Comment_Count"})
  comment_Count: number;

  @CreateDateColumn({name: "Date_Created"})
  date_Created: Date;

  @OneToMany(() => Twit, twit => twit.user_Id)
  twit: Twit;
  
  
  
}