import { UniqueEntityId } from '../entities/unique-entityId'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityId
}
