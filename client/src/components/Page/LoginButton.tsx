import { useEffect, useRef } from 'react';
import {
  clientId,
  clientSecret,
  redirectUrl,
  defaultCountryCode,
} from '../../vars';
import Button from '../Button';

export function LoginButton() {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handler(e: FormDataEvent) {
      e.formData.set('clientId', clientId());
      e.formData.set('clientSecret', clientSecret());
      e.formData.set('redirectUrl', redirectUrl());
      e.formData.set('defaultCountryCode', defaultCountryCode());
    }
    const { current } = form;
    if (current) {
      current.addEventListener('formdata', handler);
      return () => current.removeEventListener('formdata', handler);
    }
  }, []);

  return (
    <form action="/login" method="POST" target="_blank" ref={form}>
      <Button size="sm" variant="primary">
        Log in
      </Button>
    </form>
  );
}
