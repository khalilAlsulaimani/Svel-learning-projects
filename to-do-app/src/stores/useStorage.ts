import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export function useStorage<value>(
  key: string,
  initialValue: value
): Writable<value> {
  let sterilize = JSON.stringify;
  let deserialize = JSON.parse;

  let storageValue: value = deserialize(localStorage.getItem(key)!);
  let store = writable(storageValue ? storageValue : initialValue);

  store.subscribe((value) => localStorage.setItem(key, sterilize(value)));

  return store;
}
