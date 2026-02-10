import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  image: string;
}
export const BrandSchema = SchemaFactory.createForClass(Brand);

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  image: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brandId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  stock: string;
}

export const UserSchema = SchemaFactory.createForClass(Product);
