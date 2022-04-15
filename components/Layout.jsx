{/**Layout Parent dans lequel sera tout pre rendu les affichages de toutes les pages de l'appli */}

import React from 'react'
import {Header} from './'


const Layout = ({children}) => {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}

export default Layout
