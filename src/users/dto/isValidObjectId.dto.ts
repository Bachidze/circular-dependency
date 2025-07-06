import { IsMongoId } from "class-validator";
import mongoose from "mongoose";


export class isValidObjectId {
    @IsMongoId()
    id:mongoose.Schema.Types.ObjectId
}