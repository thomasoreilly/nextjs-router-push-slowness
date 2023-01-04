import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useUrlQuery } from '../hooks/useUrlQuery';

const randomNumber = () => Math.floor(Math.random() * 10);

function Home({ query }) {
  const router = useRouter();
  const [showPanel, setShowPanel] = useState(false);
  const { updateUrlQuery, queryState } = useUrlQuery(query, router);
  const handleAddUrlParam = () => {
    updateUrlQuery({ a: randomNumber() });
  };

  const handleAddingPanel = () => {
    const currentShowPanel = !showPanel;
    setShowPanel(currentShowPanel);

    updateUrlQuery({
      showPanel: currentShowPanel,
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Issue with slowness using router.push and shallow = true for updating
          Url params
        </h1>

        <button onClick={handleAddUrlParam}>Update Url param</button>
        <button onClick={handleAddingPanel}>Toggle panel</button>

        {showPanel && (
          <div className={styles.panel}>
            <h2>Hi</h2>
          </div>
        )}
      </main>
    </div>
  );
}
export const getServerSideProps = async ({ query }) => {
  const { a = null, b = null } = query;
  return {
    props: {
      query: {
        a,
        b,
        c: randomNumber(),
      },
    },
  };
};

export default Home;
