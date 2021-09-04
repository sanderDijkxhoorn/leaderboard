import Container from '@mui/material/Container';
import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import Typography from '@mui/material/Typography';

import { Trainer } from '@/types/model';
import { Leaderboard } from '@/features/leaderboard';

interface HomeProps {
  trainers: Trainer[];
}

const Home: NextPage<HomeProps> = ({ trainers }) => {
  return (
    <>
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Pokémon Go Leaderboard" />
      </Head>
      <Container maxWidth={false}>
        <Typography variant="h3" gutterBottom component="div">
          Leaderboard
        </Typography>
        <Leaderboard trainers={trainers} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { getLeaderboard } = await import('@/features/leaderboard/api');
  const trainers = await getLeaderboard();

  return {
    props: { trainers },
    // rebuild at most every hour
    revalidate: 3600,
  };
};

export default Home;
