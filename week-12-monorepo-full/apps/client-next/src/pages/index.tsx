import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button } from "ui";
import { UserInputType } from 'common';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <Button />
        <button onClick={() => {
          const userDetails: UserInputType = {
            email: 'asdfasf@gmail.com',
            password: 'asdfsdf23'
          }
          
        }}>
          Hello there
        </button>
      </main>
    </>
  )
}
