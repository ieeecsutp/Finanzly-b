import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './Rol';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column({unique: true})
    usuario: string;

    @Column({unique: true})
    correo: string;
    
    @Column()
    contraseña: string;   

    @ManyToOne(() => Rol, rol => rol.usuarios)
    @JoinColumn({ name: 'rol_id' })
    rol: Rol;

}