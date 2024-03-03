import type { GetStaticProps } from 'next'
import prisma from '../lib/prisma';

const Page = async () => {
  const data = await prisma.organization.findMany();
  const obj = data.map(function (value) {
    return <li key={value.id}>{value.id}: {value.name}</li>
  });

  return (
    <div>
      <h1>Organizations</h1>
    <div>
      <ul>
        {obj}
      </ul>
    </div>
    </div>
  );
};

export default Page;