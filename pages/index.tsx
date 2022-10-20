import { Htag, Button } from '../components';

export default function Home(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Htag tag="h2">Текст</Htag>
      <Htag tag="h3">Текст</Htag>
      <Button appearance="primary" arrow="right">
        push me
      </Button>
      <Button appearance="ghost" arrow="down">
        don't push
      </Button>
    </>
  );
}
