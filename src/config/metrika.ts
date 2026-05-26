/** ID счётчика Яндекс.Метрики */
export const YM_COUNTER_ID = Number(import.meta.env.VITE_YM_COUNTER_ID ?? '109391134')

export const YM_ENABLED =
  import.meta.env.VITE_YM_ENABLED !== 'false' && Number.isFinite(YM_COUNTER_ID) && YM_COUNTER_ID > 0
