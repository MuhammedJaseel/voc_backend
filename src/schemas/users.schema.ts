import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema({ timestamps: true })
export class Enquiry {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  msg: string;

  @Prop({ type: String })
  ip: string;

  @Prop({ type: String, required: true })
  type: 'CONTACT' | 'ENQUIRY' | 'JOIN_TEAM';

  @Prop({ type: String, required: true, default: 'NEW' })
  status: 'NEW' | 'SEEN' | 'DONE';

  @Prop({ type: String })
  statusMsg: string;
}

export const EnquirySchema = SchemaFactory.createForClass(Enquiry);
