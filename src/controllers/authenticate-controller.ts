import { Controller, Post, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createAccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountBodySchema = z.infer<typeof createAccountSchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle() {

    const token = this.jwt.sign({ sub: 'user-id' })

    return {
      token
    }
  }
}