import { useState } from 'react';
import { Htag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState(3);

  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <P size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam rerum
        recusandae consectetur a eius sint, qui dolorum maxime nihil voluptas
        perspiciatis obcaecati ipsa dignissimos, dolorem corporis, reprehenderit
        error suscipit dolor?
      </P>
      <Tag size="s">small</Tag>
      <Tag size="m" color="green">
        green med
      </Tag>
      <Tag size="s" color="gray">
        gray
      </Tag>
      <Htag tag="h2">Текст</Htag>
      <P>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia,
        dolore. Magni deleniti veritatis recusandae, iure modi reprehenderit
        labore mollitia consequatur ad harum doloremque voluptatem laudantium
        nobis praesentium fuga consequuntur est!
      </P>
      <Htag tag="h3">Текст</Htag>
      <P size="s">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
        reiciendis corrupti voluptatibus sapiente quaerat distinctio modi,
        voluptatum rem. Eaque et ullam aperiam voluptates quam molestias optio
        sequi libero harum laudantium.
      </P>
      <Tag size="m" color="primary">
        primary med
      </Tag>
      <Tag size="s" href="https://google.com">
        small link
      </Tag>
      <Tag size="m" color="red">
        red m
      </Tag>
      <Button appearance="primary" arrow="right">
        push me
      </Button>
      <Button appearance="ghost" arrow="down">
        don't push
      </Button>
      <Rating rating={rating} isEditable setRating={setRating} />
    </>
  );
}

export default withLayout(Home);
