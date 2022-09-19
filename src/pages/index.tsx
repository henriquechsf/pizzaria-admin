import Head from 'next/head';
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/logo.svg';
import Image from 'next/image';
import { Input } from '../components/ui/Input';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria - Faca seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria" />
      </div>

      <div className={styles.login}>
        <form>
          <Input type="text" placeholder='Digite seu e-mail' />
          <Input type="password" placeholder='Sua senha' />
        </form>
      </div>
    </>
  )
}
