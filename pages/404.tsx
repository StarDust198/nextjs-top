import { Htag } from '../components';
import { withLayout } from '../layout/Layout';

export function Error404(): JSX.Element {
  return (
    <>
      <Htag tag="h1">Страница не найдена</Htag>
    </>
  );
}

export default withLayout(Error404);