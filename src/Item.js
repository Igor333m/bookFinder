import React from 'react';
// "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
// 'item.volumeInfo.imageLinks.smallThumbnail'
const Item = props => {
    const { id, selfLink, volumeInfo } = props.item
    console.log("id: ", id);
    console.log("selfLink: ", selfLink);
    console.log("volumeInfo: ", volumeInfo);
    return (
        <article className="item">
            <img src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail || "https://books.google.com/googlebooks/images/no_cover_thumb.gif"} alt="Book cover of {item.volumeInfo.title}"/>
        </article>
    );
  };
  
  export default Item;