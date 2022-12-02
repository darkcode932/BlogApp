import Head from 'next/head'
import { Categories, PostCard, PostWidget } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections'
import Link from 'next/link'

function Home({ posts }) {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title> PhiBlog </title> <link rel="icon" href="/favicon.ico " />{' '}
      </Head>{' '}
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {' '}
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}{' '}
        </div>{' '}
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
            <Link href="/page1">About</Link>
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default Home

/** Fonction de de recuparation des props en statique provenant des Posts */

export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}
