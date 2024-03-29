import Head from "next/head";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.svg";
import Image from "next/image";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (email === "" || password === "") {
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Pizzaria - Faca seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
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

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
