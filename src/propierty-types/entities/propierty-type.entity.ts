import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('propiertyTypes')
export class PropiertyType {
    @PrimaryGeneratedColumn('increment', { name: 'idPropiertyType' })
    idPropiertyType: number;
    @Column('varchar', { name: 'descriptionPropiertyType' })
    descriptionPropiertyType: string
    @Column('tinyint', { name: 'active' })
    active: number
    @Column('varchar', { name: 'dateCreated', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: string;
}
