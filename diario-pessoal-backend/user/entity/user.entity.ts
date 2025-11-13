import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Usuario{
   @PrimaryGeneratedColumn()
   id: number;


   @Column({
       length:500
   })
   nome: string;


   @Column('int')
   idade: number;
}
