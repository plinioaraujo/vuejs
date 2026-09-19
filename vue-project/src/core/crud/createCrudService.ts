export type CrudServiceOptions<T, TCreate, TUpdate> = {
  list: () => Promise<T[]>
  getById: (id: number | string) => Promise<T>
  create: (payload: TCreate) => Promise<T>
  update: (id: number | string, payload: TUpdate) => Promise<T>
  remove: (id: number | string) => Promise<void>
}

export function createCrudService<T, TCreate, TUpdate>({
  list,
  getById,
  create,
  update,
  remove,
}: CrudServiceOptions<T, TCreate, TUpdate>) {
  return {
    list,
    getById,
    create,
    update,
    remove,
  }
}
