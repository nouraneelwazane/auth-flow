import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInData } from 'src/auth/model/sign-in-data.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const user = new this.userModel(createUserDto);
      user.password = await this.encryptUserPassword(user.password);
      await user.save();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user',
      };
    }
  }

  async encryptUserPassword(password: string): Promise<string> {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<SignInData> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('User not found or incorrect password');
    }
    return { userId: user._id, name: user.name };
  }
}
