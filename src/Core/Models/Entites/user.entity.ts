import { Twit } from './twit.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "Email"})
  email: string;

  @Column({name: "FullName"})
  fullName: string;

  @Column( {name: "Password"})
  password: string;

  @CreateDateColumn({name: "Date_Created"})
  date_Created: Date;

  @OneToMany(()=>Twit, twit => twit.user)
  Twits: Twit[]
  
}