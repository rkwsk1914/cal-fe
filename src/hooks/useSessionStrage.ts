type Keys = 'isDark'

export const useSessionStorage = () => {
  const getFromSessionStorage = (key: Keys) => {
    return sessionStorage.getItem(key)
  }

  const saveToSessionStorage = (key: Keys, newValue: string) => {
    sessionStorage.setItem(key, newValue)
  }

  const removeFromSessionStorage = (key: Keys) => {
    sessionStorage.removeItem(key)
  }

  return {
    getFromSessionStorage,
    saveToSessionStorage,
    removeFromSessionStorage
  }
}
