import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBasicResponse } from 'src/interfaces/response-general-requests.model';
import { GetAllUserResponse } from './interfaces/users-responses.model';
import { EditSameUserDto } from './dto/edit-same-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<ApiBasicResponse> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getAllusers(): Promise<GetAllUserResponse> {
    return this.usersService.getAllusers();
  }

  @Post('edit')
  editSameUser(@Body() updateUserDto: EditSameUserDto, @Request() req) {
    const { user } = req;
    return this.usersService.updateUser(updateUserDto, user.idUser);
  }

  @Post('/:idUser')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('idUser') idUser: string,
  ): Promise<ApiBasicResponse> {
    return this.usersService.updateUser(updateUserDto, idUser);
  }
}
