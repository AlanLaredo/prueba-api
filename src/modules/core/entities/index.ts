import { ClientEntity, ClientSchema } from './client.entity'

export {
  ClientEntity,
}

export const ClientModel = {
  name: ClientEntity.name,
  schema: ClientSchema
}

export const CORE_MODELS = [
  ClientModel
]
