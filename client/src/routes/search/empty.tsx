import React, { Suspense, useDeferredValue, useRef, useEffect } from 'react';
import { useNavigate, Outlet, useParams, useOutletContext } from 'react-router-dom';
import { SetNonNullable } from 'type-fest';
import useForm from '../../hooks/useForm';

import Form from '../../components/Form/Form';
import Skeleton from '../../components/Skeleton';
import Page from '../../components/Page';
import { RouteComponent as QueryRouteComponent } from './query';

interface FormState {
  query: string | null;
}

type SubmittedFormState = SetNonNullable<FormState, keyof FormState>;

interface EditFieldConfigFormProps {
  value: FormState['query'];
  onSubmit: (values: FormState) => void;
}

// TODO(Alessia): probably going to want to move this form to its own file
export const SearchQueryForm = ({
  value,
  onSubmit,
}: EditFieldConfigFormProps) => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const form = useForm<FormState, SubmittedFormState>({
    initialValues: {
      query: value,
    },
    validationSchema: {
      // query: combine(
      //   min(0, 'Error rate must be greater than or equal to 0'),
      //   max(1, 'Error rate must be less than or equal to 1'),
      //   required('An error rate must be set')
      // ),
    },
    onSubmit: (values) => onSubmit(values),
  });

  const handleSubmit = () => {
    form.submitForm();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Form<FormState>
        form={form}
        key="search"
        className="border-b border-primary flex flex-col gap-px pb-4 last:border-b-0"
      >
        <Form.TextField
          ref={inputRef}
          key="searchQuery"
          orientation="horizontal"
          name="query"
          type="text"
          onChange={handleSubmit}
          onSubmit={handleSubmit}
          placeholder="What do you want to listen to?"
          // onBlur={handleSubmit} // onBlur probably isn't needed given onChange + onSubmit
          // label="Search"
          // description="What do you want to listen to?"
        />
      </Form>
    </>
  );
};

export const LoadingState = () => {
  const columns = [
    <Skeleton.Text key="text" />,
    <div key="titleCell" className="flex gap-2 items-end">
      <Skeleton.CoverPhoto size="2.5rem" />
      <div className="flex flex-col flex-1 gap-2">
        <Skeleton.Text width="25%" fontSize="1rem" />
        <Skeleton.Text width="20%" fontSize="0.75rem" />
      </div>
    </div>,
    <Skeleton.Text key="album" />,
    <Skeleton.Text key="duration" />,
  ];

  return (
    <Page className="p-[var(--main-content--padding)]">
      <div className="flex flex-col gap-4">
        <section>
          <Skeleton.Heading level={2} width="25%" />
          <Skeleton.Table headers={false} rows={1} columns={columns} />
        </section>
        <section>
          <Skeleton.Heading level={2} width="25%" />
          <Skeleton.Table headers={false} rows={10} columns={columns} />
        </section>
      </div>
    </Page>
  );
};

type ContextType = { query: string };

export function useQuery() {
  return useOutletContext<ContextType>();
}

export const RouteComponent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [query, setQuery] = React.useState(params.query);
  // const query = params.query || '';
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  
  React.useEffect(() => {
    console.log({ query, deferredQuery, isStale });
    if (!isStale && typeof deferredQuery !== 'undefined') {
      navigate('/search/' + encodeURI(deferredQuery));
    }
  }, [query, isStale, deferredQuery, navigate]);

  return (
    <Page className="p-[var(--main-content--padding)]">
      <SearchQueryForm
        value={params.query || ''}
        onSubmit={(data) => {
          setQuery(data.query as string);
          // navigate('/search/' + encodeURI(data.query as string));
        }}
      />
      {/* <Suspense fallback={<LoadingState />}> */}
        {/* <Outlet /> */}
        <Outlet context={{ query: deferredQuery || '' } satisfies ContextType} />
        {/* <QueryRouteComponent query={deferredQuery} /> */}
      {/* </Suspense> */}
    </Page>
  );
};
