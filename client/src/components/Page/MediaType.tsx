import styles from './Page.module.scss';

interface MediaTypeProps {
  mediaType: string;
}

const MediaType = ({ mediaType }: MediaTypeProps) => {
  return <div className={styles.page__mediaType}>{mediaType}</div>;
};

export default MediaType;
