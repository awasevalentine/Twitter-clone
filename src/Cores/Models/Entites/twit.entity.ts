import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:"twit"})
export class Twit {
  @PrimaryGeneratedColumn()
  twit_Id: number;

  @Column({name: "UserId"})
  user_Id: string;

  @Column({name: "content"})
  content: string;

  @CreateDateColumn({name: "Date_Created"})
  date_Created: Date;
  
  @Column({name: "Likes_Count"})
  likes_Count: number;

  @ManyToOne(() => User, user => user.email)

  user: User;
  
}