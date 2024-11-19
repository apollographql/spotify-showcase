import '@apollo/client';

declare module '@apollo/client' {
  export interface DataMasking {
    enabled: true;
  }
}
