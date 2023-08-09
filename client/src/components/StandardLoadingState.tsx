import Page from './Page';
import PlayButton from './PlayButton';
import Skeleton from './Skeleton';
import LoadingStateHighlighter from './LoadingStateHighlighter';

const StandardLoadingState = () => {
  return (
    <LoadingStateHighlighter shade="#ff2600">
      <Page>
        <Page.SkeletonHeader />
        <Page.Content>
          <Page.ActionsBar>
            <PlayButton
              disabled
              variant="primary"
              size="3.5rem"
              playing={false}
            />
          </Page.ActionsBar>
          <Skeleton.Table
            rows={10}
            columns={[
              <Skeleton.Text key="text" />,
              <div key="header" className="flex gap-2 items-end">
                <Skeleton.CoverPhoto size="2.5rem" />
                <div className="flex flex-col flex-1 gap-2">
                  <Skeleton.Text width="25%" fontSize="1rem" />
                  <Skeleton.Text width="20%" fontSize="0.75rem" />
                </div>
              </div>,
              <Skeleton.Text key="text2" />,
              <Skeleton.Text key="text3" />,
            ]}
          />
        </Page.Content>
      </Page>
    </LoadingStateHighlighter>
  );
};

export default StandardLoadingState;
