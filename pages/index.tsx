import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Values from '../components/Values'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gradient-to-br from-green-400 to-blue-300">
      <Head>
        <title>NFT4ASD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <Main/>
      <Values/>
      <div className="text-white">
      <h1>
        2022 NFT for ASD &copy; All Rights Reserved
      </h1>
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator -> {
      _id,
      name,
      address,
      slug {
        current
      },
    },
  }`

  const collections = await sanityClient.fetch(query)
  
  return {
    props: {
      collections
    }
  }
}