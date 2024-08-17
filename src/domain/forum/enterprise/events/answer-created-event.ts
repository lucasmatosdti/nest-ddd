import { UniqueEntityId } from '@/core/entities/unique-entityId'
import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/answer'

export class AnswerCreateEvent implements DomainEvent {
  ocurredAt: Date
  answer: Answer

  constructor(answer: Answer) {
    this.ocurredAt = new Date()
    this.answer = answer
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
