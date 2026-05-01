import { Propierty } from "src/propierties/entities/propierty.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('propiertyImages')
export class PropiertyImage {
    @PrimaryGeneratedColumn('increment', { name: 'idPropiertyImage' })
    idPropiertyImage: number;
    @Column('int', { name: 'idPropierty' })
    idPropierty: number;
    @Column('varchar', { name: 'urlImage' })
    urlImage: string;
    @Column('tinyint', { name: 'active' })
    active: number;
    @Column('varchar', { name: 'dateCreated', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: string;

    @ManyToOne(() => Propierty, propierty => propierty.propiertyImages)
    @JoinColumn({ name: 'idPropierty' })
    propierty: Propierty;
}
