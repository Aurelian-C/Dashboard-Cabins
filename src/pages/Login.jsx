import LoginForm from '../features/authentication/LoginForm';
import classes from './Login.module.css';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

function Login() {
  return (
    <main className={classes.main}>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
