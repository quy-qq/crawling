import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type DriverDocument = Driver & Document;

@Schema({
  collection: 'Driver',
})
export class Driver {
  _id: string;

  @Prop({ type: Number, required: true })
  pos: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  nationality: string;

  @Prop({ type: String, required: true })
  carName: string;

  @Prop({ type: Number, required: true })
  pts: number;

  @Prop({ type: String, required: true })
  year: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}
const DriverSchema = SchemaFactory.createForClass(Driver);
export default DriverSchema;
