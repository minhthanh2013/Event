import { Injectable } from '@nestjs/common';
import { CreateHostDto } from './dto/create-host.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateHostDto } from './dto/update-host.dto';

@Injectable()
export class HostService {
  constructor(
    private prisma: PrismaService) {}

  findAll() {
    return `This action find all hosts`;
  }

  findOne(id: number) {
    const host = this.prisma.host.findUnique({
      where: {
          hostID: id,
      }
  });
  return host;
  }

  update(id: number, updateHostDto: UpdateHostDto) {
    return `This action updates a #${id} host`;
  }

  remove(id: number) {
    return `This action removes a #${id} host`;
  }
}
