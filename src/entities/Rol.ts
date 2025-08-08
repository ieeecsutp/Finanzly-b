import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;
    
    @OneToMany(() => Usuario, usuario => usuario.rol)
    usuarios: Usuario[];

}