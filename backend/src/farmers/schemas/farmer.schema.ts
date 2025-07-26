import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FarmerDocument = Farmer & Document;

@Schema({ timestamps: true })
export class Farmer {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  cpf: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  phone?: string;

  @Prop({ default: true })
  active: boolean;
}

export const FarmerSchema = SchemaFactory.createForClass(Farmer);