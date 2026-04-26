import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ubications')
export class Ubication {
    @PrimaryGeneratedColumn('increment',{name:'idUbication'})
    idUbication: number;
    @Column('varchar',{name:'descriptionUbication'})
    descriptionUbication: string;
    @Column('tinyint',{name:'active'})
    active: number;
    @Column('varchar',{name:'dateCreated',default:() => 'CURRENT_TIMESTAMP'})
    dateCreated: string;

}
