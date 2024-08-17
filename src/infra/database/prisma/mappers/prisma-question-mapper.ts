import { UniqueEntityId } from "@/core/entities/unique-entityId";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";
import { Question as PrismaQuestion } from "@prisma/client";


export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion) {
    return Question.create({
      title: raw.title,
      slug: Slug.create(raw.slug),
      content: raw.content,
      authorId: new UniqueEntityId(raw.authorId),
      bestAnswerId: undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }, new UniqueEntityId(raw.id))
  }
}