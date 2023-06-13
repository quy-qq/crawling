import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type RaceDocument = Race & Document;

@Schema({
  collection: 'Race',
})
export class Race {
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
const RaceSchema = SchemaFactory.createForClass(Race);
export default RaceSchema;
