import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity('test_task_user')
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public login: string;

    @Column()
    public password: string;

    @CreateDateColumn()
    public createTime: Date;

    @UpdateDateColumn()
    public updateTime: Date;

    @Column()
    public deleteTime: Date;
}
