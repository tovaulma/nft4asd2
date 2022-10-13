import React, { useState, useEffect } from 'react'
import Logo from '../../public/favicon.ico'
import { useAddress, useDisconnect, useMetamask, useContract } from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import { toNamespacedPath } from 'path';
import Head from 'next/head'
import toast, { Toaster } from 'react-hot-toast'

interface Props {
    collection: Collection
}

function NFTDropPage({collection}: Props) {
    const [claimedSupply, setClaimedSupply] = useState<number>(0)
    const [totalSupply, setTotalSupply] = useState<BigNumber>()
    const [price, setPrice] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true);
    const nftDrop = useContract(collection.address, "nft-drop").contract;

    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();



    useEffect(() => {
        if (!nftDrop) return
        const fetchPrice = async () => {
            const claimConditions = await nftDrop.claimConditions.getAll();

            setPrice(claimConditions?.[0].currencyMetadata.displayValue)
        }
        fetchPrice()
    }, [nftDrop])

    useEffect(() => {
        if (!nftDrop) return;

        const fetchNFTDropData = async () => {
            setLoading(true);

            const claimed = await nftDrop.getAllClaimed();
            const total = await nftDrop.totalSupply();
            
            setClaimedSupply(claimed.length);
            setTotalSupply(total);

            setLoading(false);
        }
        fetchNFTDropData();
    }, [nftDrop])

    const mintNft = () => {
        if (!nftDrop || !address) return;

        const quantity = 1;

        setLoading(true);

        const notification = toast.loading('Minting...', {
            style: {
                background: 'white',
                color: 'green',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
            }
        })

        nftDrop.claimTo(address, quantity).then(async (tx) => {
            const receipt = tx[0].receipt;
            const claimedTokenId = tx[0].id;
            const claimedNFT = await tx[0].data();
            const claimed = await nftDrop.getAllClaimed();
            setClaimedSupply(claimed.length);
            console.log(receipt);
            console.log(claimedTokenId);
            console.log(claimedNFT);

            toast('NFT Successfully Minted!', {
                duration: 8000,
                style: {
                    background: 'white',
                    color: 'green',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                }
            })
        }).catch(err => {
            console.log(err);
            toast('Something went wrong...', {
                duration: 8000,
                style: {
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                }
            })
        }).finally(() => {
            setLoading(false);
            toast.dismiss(notification);
        })
    }

    return (
    <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
        <Toaster position="bottom-center"/>
        <Head>
            <title>{collection.title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Left */}
        <div className='lg:col-span-4 bg-gradient-to-br from-green-400 to-blue-300'>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
                <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-2xl'>
                    <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-96'
                    src={urlFor(collection.previewImage).url()} alt='' />
                </div>
                <div className='space-y-2 p-5 text-center'>
                    <h1 className='text-4xl font-bold text-white'>
                        {collection.nftCollectionName}
                    </h1>
                    <h2 className='text-lg text-gray-100'>
                        {collection.description}
                    </h2>
                </div>
            </div>
        </div>
        {/* Right */}
        <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
            {/* Header */}
            <header className='items-center flex justify-between'>
                <Link href={'/'}>
                    <img src={Logo.src} className='w-20'/>
                </Link>
                <button className='rounded-full bg-blue-300 text-white px-4 py-2 text-xs 
                font-bold lg:px-5 lg:py-3 lg:text-base' 
                onClick={() => address ? disconnect() : connectWithMetamask()}>
                    {address ? 'Sign Out' : 'Sign In with MetaMask'}
                </button>
            </header>

            <hr className='my-2 border' />
            {address && (
                <p className='text-center text-sm text-rose-400'>
                    You're logged in with wallet {address.substring(0, 5)}...{address.substring(address.length - 5)}</p>
            )}

            {/* Content */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0'>
                <img 
                className='w-100 object-cover pb-10 lg:h-40'
                src={urlFor(collection.mainImage).url()} alt='' />
                <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                    {collection.title}
                </h1>
                {loading ? (
                <p className='animate-pulse pt-2 text-xl text-green-500'>Loading Supply Count...</p>
                ) : (
                <p className='pt-2 text-xl text-green-500'>{claimedSupply} / {totalSupply?.toString()} NFTs minted</p>
                )} 

                {loading && (
                <img className='h-80 w-80 object-contain' src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif' alt='' />
                )}

            </div>
            {/* Mint Button */}
            <button 
            onClick={mintNft}
            disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} 
            className='h-16 bg-blue-300 w-full text-white rounded-full mt-10 font-bold disabled:bg-gray-400'>
                {loading ? (
                    <>Loading</>
                ) : claimedSupply === totalSupply?.toNumber() ? (
                    <>SOLD OUT</>
                ) : !address ? (
                    <>Sign In to Mint</>
                ) : (
                    <span className='font-bold'>Mint NFT (0.05 BNB)</span>
                )}
                
            </button>
        </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const query = `*[_type == "collection" && slug.current == $id][0]{
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
    const collection = await sanityClient.fetch(query, {
        id: params?.id
    })

    if (!collection) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            collection
        }
    }
}