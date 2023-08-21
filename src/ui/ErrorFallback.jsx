import Box from './Box';
import Button from './Button';
import classes from './ErrorFallback.module.css';
import Heading from './Heading';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className={classes.main}>
      <Box>
        <Heading as="h1">Something went wrong!</Heading>
        <p>{error.message}</p>
        <Button size="large" onClick={resetErrorBoundary}>
          Try again!
        </Button>
      </Box>
    </main>
  );
}
