import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type TeamDocument = Team & Document;

@Schema({
  collection: 'Team',
})
export class Team {
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
const TeamSchema = SchemaFactory.createForClass(Team);
export default TeamSchema;
