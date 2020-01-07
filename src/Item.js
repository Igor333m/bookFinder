import React from 'react';
// "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
// 'item.volumeInfo.imageLinks.smallThumbnail'
const Item = props => {
    const { id, selfLink, volumeInfo } = props.item
    console.log("id: ", id);
    console.log("selfLink: ", selfLink);
    console.log("volumeInfo: ", volumeInfo);
    return (
        <section className="item">
            <h2>{volumeInfo.title}</h2>
            <p>By: {volumeInfo.authors && volumeInfo.authors.map( author => author ) || 'No authors found'}</p>
            <p>Published By: {volumeInfo.publisher || 'Unknown publisher'}</p>
            <p>Published Date: {volumeInfo.publishedDate}</p>
            <img src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail || "https://books.google.com/googlebooks/images/no_cover_thumb.gif"} alt="Book cover of {item.volumeInfo.title}"/>
            <a href={volumeInfo.infoLink} target="_blank">See this Book</a>
        </section>
    );
  };
  
  export default Item;