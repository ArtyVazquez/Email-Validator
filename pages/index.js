import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRef, useState } from 'react'



export default function Home() {
  const inputRef = useRef();
  const [emailRes, setEmailRes] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();

    const res = await axios.get(`/api/verify-email?EMAIL=${inputRef.current.value}`);

    try {
      if (res.data.valid) {
        setEmailRes(true);
      } else  {
        setEmailRes(false);
      }

    } catch (err) {
      console.log(err);
    }

    inputRef.current.value = null;
    inputRef.current.blur();
    
  }


  function emailResRender(res) {
    if (res == true)
      return <div className={styles.valid}>Valid</div>
    else if (res == false)
      return <div className={styles.invalid}>Invalid</div>
    else
      return <></>
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Free Email Validator</title>
        <meta name="Free email validator" content="Validate an email." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={submitHandler}>
          <input type='email' placeholder='Email:' className={styles.cusInput} ref={inputRef}></input>
          <button type='submit' className={styles.cusButton}>Check</button>
        </form>
        {emailResRender(emailRes)}
      </main>

      <footer className={styles.footer}>
        © 2022 Arturo Vazquez
      </footer>
    </div>
  )
}
