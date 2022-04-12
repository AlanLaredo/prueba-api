/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Parent, ResolveField, Context } from '@nestjs/graphql'

import { ClientEntity } from '../entities'
import { GetClientsFilterArgs, CreateClientInput, UpdateClientInput } from '../dtos/client'
import { ClientService } from '../services'
import { DeleteIDInput } from 'src/common/dtos/input/delete.id.dto'


@Resolver(() => ClientEntity)
export class ClientResolver {
  constructor (
    private readonly clientService: ClientService) { }

  @Query(returns => ClientEntity)
  async client (@Args() data: GetClientsFilterArgs): Promise<ClientEntity> {
    return this.clientService.getOne(data)
  }

  @Query(returns => [ClientEntity])
  async clients (@Args() data: GetClientsFilterArgs): Promise<ClientEntity[]> {
    return this.clientService.get(data)
  }

  @Query(returns => [ClientEntity])
  async clientsFind (@Args() data: GetClientsFilterArgs): Promise<ClientEntity[]> {
    return this.clientService.find(data)
  }

  @Mutation(() => ClientEntity)
  async createClient (
    @Args('createClientData') createClientData: CreateClientInput): Promise<ClientEntity> {
      const data: ClientEntity = { ...createClientData, createdAt: new Date() }
      return this.clientService.create(data)
  }

  @Mutation(() => ClientEntity)
  async updateClient (
    @Args('updateClientData') updateClientData: UpdateClientInput): Promise<ClientEntity> {
      const data: Partial<ClientEntity> = { ...updateClientData, modifiedAt: new Date() }
    return this.clientService.update(updateClientData)
  }

  @Mutation(() => ClientEntity)
  async deleteClient (
    @Args('deleteClientData') deleteClientData: DeleteIDInput): Promise<ClientEntity> {
      const data: Partial<ClientEntity> = { ...deleteClientData, deletedAt: new Date() }
    return this.clientService.delete(data)
  }
}
