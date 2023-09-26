import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class UserData{
    @Field()
    readonly username: string;

    @Field()
    readonly password: string;
}

@InputType()
export class UserModel {
    @Field()
    id: number;
  
    @Field()
    password: string;
  
    @Field()
    username: string;
  }