import React from 'react'
import "../globalCss/category.css"

const Category = () => {
  return (
    <div>
      <div className='flex m-5'>
        <div className='image-container'>
            <img className='image' src="https://static-ecapac.acer.com/media/catalog/product/a/c/acer-swift-go-14-sfg14-73-with-fingerprint-with-backlit-wp-logo-frost-blue-01-custom_nx.ku7sm.001_nx.ku7sn.007_1.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500" alt="" />
            <button className='overlay-button font-bold'>Accer</button>
        </div>
      </div>
    </div>
  )
}

export default Category
