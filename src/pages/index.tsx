import Head from "next/head";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria - Faca seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input type="text" placeholder="Digite seu e-mail" />
            <Input type="password" placeholder="Sua senha" />

            <Button type="submit" loading={true}>
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}
