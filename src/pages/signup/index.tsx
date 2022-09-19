import Head from "next/head";
import styles from "../../../styles/home.module.scss";

import logoImg from "../../../public/logo.svg";
import Image from "next/image";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faca seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form>
            <Input type="text" placeholder="Digite seu nome" />
            <Input type="text" placeholder="Digite seu e-mail" />
            <Input type="password" placeholder="Sua senha" />

            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>

          <Link href="/">
            <a className={styles.text}>Ja possui uma conta? Faca login</a>
          </Link>
        </div>
      </div>
    </>
  );
}
