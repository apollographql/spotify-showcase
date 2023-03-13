import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client';
import { FormEvent, useEffect, useRef } from 'react';
import { IS_LOGGED_IN_QUERY } from '../../hooks/useIsLoggedIn';
import {
  clientId,
  clientSecret,
  redirectUrl,
  defaultCountryCode,
} from '../../vars';
import Button from '../Button';

function formDataHandler(e: FormDataEvent) {
  e.formData.set('clientId', clientId());
  e.formData.set('clientSecret', clientSecret());
  e.formData.set('redirectUrl', redirectUrl());
  e.formData.set('defaultCountryCode', defaultCountryCode());
}

export function LoginButton({ onLogin }: { onLogin?: () => void }) {
  const form = useRef<HTMLFormElement>(null);

  const loginStatus = useQuery(IS_LOGGED_IN_QUERY, {
    onCompleted() {
      loginStatus.stopPolling();
      onLogin?.();
    },
  });

  function formSubmitHandler() {
    loginStatus.startPolling(500);
    // TODO: handle auth failures?
  }

  useEffect(() => {
    const { current } = form;
    if (current) {
      current.addEventListener('formdata', formDataHandler);
      return () => current.removeEventListener('formdata', formDataHandler);
    }
  }, []);

  return (
    <form
      action="/login"
      method="POST"
      target="_blank"
      ref={form}
      onSubmit={formSubmitHandler}
    >
      <Button size="sm" variant="primary">
        Log in
      </Button>
    </form>
  );
}
