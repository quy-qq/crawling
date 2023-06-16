import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type RaceDocument = Race & Document;

@Schema({
  collection: 'Race',
})
export class Race {
  _id: string;

  @Prop({ type: String, required: true })
  grandPrix: string;

  @Prop({ type: String, required: true })
  date: string;

  @Prop({ type: String, required: true })
  winner: string;

  @Prop({ type: String, required: true })
  carName: string;

  @Prop({ type: Number, required: true })
  laps: number;

  @Prop({ type: String, required: true })
  time: string;

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
const RaceSchema = SchemaFactory.createForClass(Race);
export default RaceSchema;
