import React from 'react'
import {HiOutlineCalendar} from 'react-icons/hi'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({ post }) => {
  console.log(post)

  return (
    <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="absolute h-80 w-full rounded-t-lg object-cover object-top shadow-lg lg:rounded-lg"
        />
      </div>
      <h1 className='transition duration-500 text-center mb-8 cursor-pointer
        hover:text-gray-600 text-3xl font-semibold'>
          <Link href={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h1>
        <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
          <div className="flex items-centers justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              alt={post.author.name}
              height='30px'
              width='30px'
              className="align-middle rounded-full"
              src={post.author.photto.url}
              />
              <p className='inline align-middle text-gray-700 ml-2 font-medium text-lg'>{post.author.name}</p>
          </div>
          <div className="flex items-center font-medium text-gray-700">
            <HiOutlineCalendar className='h-6 w-6 inline mr-2 text-gray-700'/>
            <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
          </div>
        </div>
        <p className="text-center text-gray-700 text-lg font-normal px-4 lg:px-20 mb-8">{post.excerpt}</p>
        <div className="text-center">
          <Link href={`/post/${post.slug}`}>
            <span className='transition duration-500 transform hover:translate-y-1 inline-block bg-gray-700 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer'>Read More</span>
          </Link>
        </div>
    </div>
  )
}

export default PostCard
