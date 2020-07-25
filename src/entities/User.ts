import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

type ConstuctorInit = {
  id?: number;
  email?: string;
  displayName?: string;
  socialProvider?: string;
  socialProviderId?: string;
  photo?: string;
  isVerified?: boolean;
};

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  socialProvider: string;

  @Column({ nullable: true })
  socialProviderId: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isActive: boolean;

  constructor(init: ConstuctorInit) {
    super();
    Object.assign(this, init);
    // this.email = email;
    // this.displayName = displayName;
    // this.socialProvider = socialProvider;
    // this.socialProviderId = socialProviderId;
    // this.photo = photo;
    // this.isVerified = isVerified;
  }

  static findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }
}
