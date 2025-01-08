/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { GetUserDTOResponse, UserDTOResponse, UserDTOResponse2, UserDTOResponse3, UserOrderDTO, UserUpdateDTO } from "./DTOs/Users.DTOs";
import { User } from "./User.entity";


@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getAllUsers(page: number, limit: number): Promise<GetUserDTOResponse> {
    const users: User[] = await this.usersRepository.getUsers();

    const totalItems: number = users.length;
    const maxPages: number = Math.ceil(totalItems / limit);
    const currentPage: number = Math.min(Math.max(1, page), maxPages);
    const init: number = (currentPage - 1) * limit;
    const end: number = Math.min(currentPage * limit, totalItems);

    const getUsers: User[] = users.slice(init, end);
    const Users: UserDTOResponse[] = getUsers.map(
      (user): UserDTOResponse2 => ({
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        country: user.country,
        city: user.city,
        isAdmin: user.isAdmin
      }),
    );

    return {
      dataPage: {
        totalItems,
        maxPages,
        page: currentPage,
        currentItems: getUsers.length,
      },
      users: Users,
    };
  }

  async getUserById(id: string): Promise<UserDTOResponse3> {
    const user: User = await this.usersRepository.getUserById(id);
    const { password, isAdmin, createUser, updateUser, ...data } = user;
    const orderLimit: UserOrderDTO[] = data.orders.map(order => {
      const {updateUser, isAdmin, createUser, password, orders, ...extra} = order.user
      return extra
    })
    const userEdit: UserDTOResponse3 = {...data, orders: orderLimit};
    return userEdit;
  }

  async deleteUser(id: string): Promise<string> {
    return this.usersRepository.deleteUser(id);
  }

  async editUser(id: string, user: Partial<UserUpdateDTO>): Promise<string> {
    return this.usersRepository.editUser(id, user);
  }
}
