import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
	background-color: whitesmoke;
	width: 40rem;
	height: 32rem;
	margin: 2rem 2rem;
	padding: 2rem;
	-moz-border-radius: 0 3rem 0 0;
	border-radius: 0 3rem 0 0;
`;

const Book = styled.div`
	display: flex;
  height: 24rem;
`;

const BookImage = styled.div`
	position: relative;
  bottom: 4rem;
  margin-right: 1.5rem;
  flex: 1 40%;
`;

const Img = styled.img`
	width: 128px;
  box-shadow: 0 0 30px #333;
`;

const BookInfoLink = styled.a`
	position: relative;
  left: 16rem;
  display: inline-block;
  height: 4rem;
  width: 20rem;
  text-align: center;
  text-decoration: none;
  background-color:green;
  padding: 1rem;
  font-weight: 500;
  color: whitesmoke;
  -moz-border-radius: 15px;
  border-radius: 15px;
`;

const BookDescription = styled.div`
	flex: auto;
`;
// "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
// 'item.volumeInfo.imageLinks.smallThumbnail'
const Item = props => {
	const { id, selfLink, volumeInfo } = props.item
	console.log("id: ", id);
	console.log("selfLink: ", selfLink);
	console.log("volumeInfo: ", volumeInfo);
	return (
		<Section>
			<Book>
				<BookImage>
					<Img src={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail || "https://books.google.com/googlebooks/images/no_cover_thumb.gif"} alt="Book cover of {item.volumeInfo.title}"/>
				</BookImage>
				<BookDescription>
					<h2 className="line-clamp" title={volumeInfo.title}>{volumeInfo.title}</h2>
					<p>By: {volumeInfo.authors && volumeInfo.authors.map( author => author ) || 'No authors found'}</p>
					<p>Published By: {volumeInfo.publisher || 'Unknown publisher'}</p>
					<p>Published Date: {volumeInfo.publishedDate}</p>
				</BookDescription>
			</Book>
			<BookInfoLink href={volumeInfo.infoLink} target="_blank" rel="noopener">See this Book</BookInfoLink>
		</Section>
	);
};

export default Item;