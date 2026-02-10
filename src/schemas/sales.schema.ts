import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({
    required: true,
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        count: { type: Number, required: true },
      },
    ],
  })
  items: {
    productId: Types.ObjectId;
    count: number;
  }[];

  @Prop({
    required: true,
    type: String,
    default: 'INIT',
    enum: ['INIT', 'ORDERED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
  })
  status: string;

  @Prop({
    required: true,
    type: String,
    default: 'DELIVERY',
    enum: ['PICKUP', 'DELIVERY'],
  })
  type: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  note: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

@Schema({ timestamps: true })
export class Purchase {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  items: Types.ObjectId[];

  @Prop({
    required: true,
    type: String,
    default: 'INIT',
    enum: ['INIT', 'ORDERED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
  })
  status: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  note: string;
}
export const UserSchema = SchemaFactory.createForClass(Purchase);
