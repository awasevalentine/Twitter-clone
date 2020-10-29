import { TwitComment } from './comment.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:"twits"})
export class Twit {
  @PrimaryGeneratedColumn()
  twit_Id: number;

  @Column({name: "user_Id"})
  user_Id: string;

  @Column({name: "content"})
  content: string;

  @CreateDateColumn({name: "date_Created"})
  date_Created: Date;
  
  @Column({name: "likes_Count"})
  likes_Count: number;

  @Column({name: "comments_Count"})
  commentsCount: number;

  @ManyToOne(() => User, user => user.email)
  @JoinColumn({name: 'user_Id'})
  user: User;

  @OneToMany(()=> TwitComment, comment => comment.twits)
  Comments: TwitComment[]
  
}