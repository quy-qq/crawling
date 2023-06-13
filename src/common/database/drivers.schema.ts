import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type DriverDocument = Driver & Document;

@Schema({
  collection: 'Driver',
})
export class Driver {
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

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
