import { PropiertyImage } from "src/propierty-images/entities/propierty-image.entity";
import { PropiertyState } from "src/propierty-states/entities/propierty-state.entity";
import { PropiertyType } from "src/propierty-types/entities/propierty-type.entity";
import { Ubication } from "src/ubications/entities/ubication.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('propierties')
export class Propierty {
    @PrimaryGeneratedColumn('increment', { name: 'idPropierty' })
    idPropierty: number;
    @Column('bigint', { name: 'price' })
    price: number;
    @Column('mediumint', { name: 'idUbication' })
    idUbication: number;
    @Column('mediumint', { name: 'idPropiertyType' })
    idPropiertyType: number;
    @Column('enum', { name: 'typeOperation', enum: ['1', '2'] })
    typeOperation: string;
    @Column('varchar', { name: 'descriptionPropierty' })
    descriptionPropierty: string;
    @Column('mediumint', { name: 'idPropiertyState' })
    idPropiertyState: number;
    @Column('tinyint', { name: 'active' })
    active: number;
    @Column('varchar', { name: 'dateCreated', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: string;
    @Column('tinyint', { name: 'numRoom' })
    numRoom: number;
    @Column('tinyint', { name: 'numBathroom' })
    numBathroom: number;
    @Column('tinyint', { name: 'garage' })
    garage: number;
    @Column('varchar', { name: 'squareMeters' })
    squareMeters: string;
    @Column('varchar', { name: 'neighborhood' })
    neighborhood: string;
    @Column('char', { name: 'propiertyCode', unique: true })
    propiertyCode: string;

    @OneToOne(() => Ubication, ubication => ubication.idUbication)
    @JoinColumn({ name: 'idUbication' })
    ubication: Ubication;

    @OneToOne(() => PropiertyType, propiertyType => propiertyType.idPropiertyType)
    @JoinColumn({ name: 'idPropiertyType' })
    propiertyType: PropiertyType;

    @OneToOne(() => PropiertyState, propiertyState => propiertyState.idPropiertyState)
    @JoinColumn({ name: 'idPropiertyState' })
    propiertyState: PropiertyState;

    @OneToMany(() => PropiertyImage, propiertyImage => propiertyImage.propierty)
    propiertyImages: PropiertyImage[];

}
