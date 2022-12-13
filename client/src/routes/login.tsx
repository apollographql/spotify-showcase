import Button from '../components/Button';
import Flex from '../components/Flex';
import styles from './login.module.scss';

const Login = () => {
  return (
    <Flex
      className={styles.container}
      alignItems="center"
      justifyContent="center"
    >
      <Button
        as="a"
        size="md"
        variant="primary"
        href={`${process.env.REACT_APP_SERVER_HOST}/oauth/init`}
      >
        Login with Spotify
      </Button>
    </Flex>
  );
};

export default Login;
