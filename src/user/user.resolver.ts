import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserData, UserModel } from './dto/Model/user-data';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => [UserEntity])
  async getAllUser() {
    return await this.usersService.getAllUsers();
  }

  @Mutation(() => Boolean)
  async createUser(@Args('input') input: UserData){
    try {
      await this.usersService.createNewUser(input);
      return true;
    } catch (e) {
      return false;
    }
  }

  @Query(() => String)
  async getUserById(@Args('userId') userId: number) {
    return JSON.stringify(await this.usersService.getUserData(userId));
  }

  @Mutation(() => String)
  async deleteUser(@Args('userId') userId: number){
    const valueReturn = await this.usersService.deleteUser(userId);
    switch (valueReturn){
      case 0:
        return "Falied Delete User";
      case 1:
        return "Successs Delete User";
      case -1:
        return 'Cannot find user with Id: ' + userId;
      default:
        return "Unknown error";
    }
  }

  @Mutation(() => Boolean)
  async updateUser(@Args('userEntity') userEntity: UserModel){
    return this.usersService.updateUser(userEntity);
  }
}
