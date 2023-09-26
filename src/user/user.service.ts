import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserData, UserModel } from './dto/Model/user-data';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createNewUser(userData: UserData): Promise<UserEntity> {
    this.userRepository.create(userData);
    return await this.userRepository.save(userData);
  }

  async getAllUsers(){
    return await this.userRepository.find();
  }

  async getUserData(userID: number){
    return await this.userRepository.findOneBy({id: userID});
  }
  
  async deleteUser(userId: number): Promise<number> {
    const userData = await this.getUserData(userId);
    if (!userData) {
      return -1;
    }
    try{
      await this.userRepository.delete(userId);
      return 1;
    } catch (e) {
      return 0;
    }
  }

  async updateUser(userModel: UserModel): Promise<boolean> {
    const userData = await this.getUserData(userModel.id);
    if (!userData) {
      return false;
    }
    const updateData = new UserEntity;
    updateData.id = userModel.id;
    updateData.username = userModel.username;
    updateData.password = userModel.password;
    try{
      Object.assign(userData, updateData);
      await this.userRepository.save(userData);
    }catch{
      return false;
    }
    return true;
  }
}
