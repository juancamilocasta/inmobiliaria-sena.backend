import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('propiertyState')
export class PropiertyState {
    @PrimaryGeneratedColumn('increment', { name: 'idPropiertyState' })
    idPropiertyState: number;
    @Column('varchar', { name: 'descriptionState' })
    descriptionState: string;
    @Column('tinyint', { name: 'active' })
    active: number;
    @Column('varchar', { name: 'dateCreated', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: string;
}
