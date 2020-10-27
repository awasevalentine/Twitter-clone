import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"user"})
export class User {
  @PrimaryGeneratedColumn()
  user_Id: number;

  @Column({name: "Email"})
  email: string;

  @Column({name: "FullName"})
  fullName: string;

  @Column( {name: "Password"})
  password: string;

  @CreateDateColumn({name: "Date_Created"})
  date_Created: Date;
  
}