{/**Composant d'affichage de l'auteru d'un Post */}

import React from 'react'
import Image from 'next/image'

const Author = ({author}) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-30'>
        <div className="absolute left-0 right-0 -top-14">
            <Image
            alt={author.name}
            unoptimized
            height="100px"
            width='100px'
            src={author.photto.url}
            className="align-middle rounded-full"
        />
        </div>
        <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
        <p className="text-white text-lg">{author.bio}</p>
    </div>
  )
}

export default Author