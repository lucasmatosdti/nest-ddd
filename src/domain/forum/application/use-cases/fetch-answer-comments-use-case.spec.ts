import { UniqueEntityId } from '@/core//entities/unique-entityId'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments-use-case'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch Answer AnswerComment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-id'),
      }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('answer-id'),
      }),
    )

    const result = await sut.execute({
      answerId: 'answer-id',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })

  it('should be able to fetch paginated recent answer comments ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-id'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-id',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
