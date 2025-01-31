import { PrismaService } from '@/infra/database/prisma/prisma.service'
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createAccountSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountSchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private readonly prisma: PrismaService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async create(@Body() body: CreateAccountBodySchema) {
    const { email, name, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException('User with same email already exists')
    }

    const passwordHash = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    })
  }
}
