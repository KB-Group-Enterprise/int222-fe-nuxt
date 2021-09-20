import { Plugin } from '@nuxt/types';
declare module '@nuxt/types' {
  interface Context {
    $swal: (...any: any[]) => void;
  }
}
const myPlugin: Plugin = (context, inject) => {};

export default myPlugin;
