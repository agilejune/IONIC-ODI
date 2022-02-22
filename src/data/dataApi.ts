import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
const dataUrl = "localhost:8081/getData";

export const getData = async () => {
  const response = await Promise.all([
    fetch(dataUrl)]);
  
  const data = {
    data: response[0].json
  }
  return data;
}

export const getStorageData = async () => {
  const response = await Promise.all([
    Storage.get({ key: 'HAS_LOGGED_IN' })]);
  const isLoggedin = await response[0].value === 'true';
  const data = {
    isLoggedin,
  }
  return data;
}

export const setStorageData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: 'HAS_LOGGED_IN', value: JSON.stringify(isLoggedIn) });
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: 'USERNAME' });
  } else {
    await Storage.set({ key: 'USERNAME', value: username });
  }
}