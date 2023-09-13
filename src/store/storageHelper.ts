import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"

const storageKey = '_aura'

export const backupStore = (store: ToolkitStore) => {
  const saveState = () => {
    const state = store.getState()
    try {
      const serializedState = serialize(state)
      localStorage.setItem(storageKey, serializedState)
    } catch (err) {
      console.error('Error while saving state', err)
    }
  }

  window.addEventListener('beforeunload', saveState)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      saveState()
    }
  })

  return () => {
    window.removeEventListener('beforeunload', saveState)
    document.removeEventListener('visibilitychange', saveState)
  }
}
export const loadStore = () => {
  try {
    const serializedState = localStorage.getItem(storageKey)
    return serializedState === null ? undefined : deserialize(serializedState)
  } catch (err) {
    return undefined
  }
}

function serialize(data: object): string {
  return btoa(encodeURIComponent(JSON.stringify(data)))
}

function deserialize(b64: string): object  {
  return JSON.parse(decodeURIComponent(atob(b64)))
}
