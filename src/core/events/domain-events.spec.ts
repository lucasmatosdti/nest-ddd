import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entityId'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate
  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
    return aggregate
  }
}

describe('DomainEvents', () => {
  it('should be able to dispatch and listen to domain events', () => {
    const callbackSpy = vi.fn()

    // Subscribe cadastrado(ouvindo o evento de resposta criado)
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Estou criando uma resposta porem SEM salvar no banco
    const aggregate = CustomAggregate.create()

    // A resposta foi criada porem ainda não foi salva no banco
    expect(aggregate.domainEvents).toHaveLength(1)

    // Estou salvando a resposta no banco e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ou o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
