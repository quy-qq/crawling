import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type RaceResultDocument = RaceResult & Document;

@Schema({
  collection: 'RaceResult',
})
export class RaceResult {
  _id: string;

  @Prop({ type: String, required: true })
  grandPrix: string;

  @Prop({ type: Number, required: true })
  pos: number;

  @Prop({ type: Number, required: true })
  no: number;

  @Prop({ type: String, required: true })
  driver: string;

  @Prop({ type: String, required: true })
  carName: string;

  @Prop({ type: Number, required: true })
  laps: number;

  @Prop({ type: String, required: true })
  time: string;

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
const RaceResultSchema = SchemaFactory.createForClass(RaceResult);
export default RaceResultSchema;
