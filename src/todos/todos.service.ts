import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma.service';
import { todo } from '@prisma/client';
import { Todo } from './entities/todo.entity';
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}

  /* model todo {
    title     String    @db.VarChar(255)
    isDone    Boolean   @default(false)
  } */

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.title,
        isDone: createTodoDto.is_done,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.prismaService.todo.update({
      where: {
        id: id, //이렇게 해도 되고
      },
      data: {
        title: updateTodoDto.title,
        isDone: updateTodoDto.is_done,
      },
    });
  }
  remove(id: number): Promise<Todo> {
    return this.prismaService.todo.delete({
      where: { id }, // 이렇게도 됌 (키랑 값이랑 같은 경우)
    });
  }
}
