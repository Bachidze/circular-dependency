import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Role } from "src/enums/role.enum";

@Schema({timestamps:true})
export class User {

    @Prop({type:String})
    fullname:string

    @Prop({type:String})
    email:string

    @Prop({type:String})
    password:string

    @Prop({type:String,default:Role.USER})
    role:string

    @Prop({type:[mongoose.Schema.Types.ObjectId],ref:"Post",default:[]})
    posts:mongoose.Schema.Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)
