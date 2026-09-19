import { ref } from 'vue'

export function useCrud<
  T extends Record<string, any> & { id?: number | string },
  TCreate,
  TUpdate,
>(
  service: {
    list: () => Promise<T[]>
    create: (payload: TCreate) => Promise<T>
    update: (id: number | string, payload: TUpdate) => Promise<T>
    remove: (id: number | string) => Promise<void>
  },
) {
  const items = ref<T[]>([])
  const loading = ref(false)

  async function fetchAll() {
    loading.value = true

    try {
      items.value = await service.list()
    } finally {
      loading.value = false
    }
  }

  async function create(payload: TCreate) {
    const created = (await service.create(payload)) as T
    items.value = [created, ...items.value] as T[]
    return created
  }

  async function updateById(id: number | string, payload: TUpdate) {
    const updated = (await service.update(id, payload)) as T
    const index = items.value.findIndex((item) => String((item as T & { id?: number | string }).id) === String(id))

    if (index >= 0) {
      items.value = items.value.map((item, itemIndex) => (itemIndex === index ? updated : item)) as T[]
    }

    return updated
  }

  async function removeById(id: number | string) {
    await service.remove(id)
    items.value = items.value.filter((item) => String((item as T & { id?: number | string }).id) !== String(id))
  }

  return {
    items,
    loading,
    fetchAll,
    create,
    updateById,
    removeById,
  }
}
