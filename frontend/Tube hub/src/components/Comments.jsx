import React from 'react'
import styled from 'styled-components'
import Comment from './Comment.jsx'

const Container = styled.div`
padding-bottom:10px;
`;

const NewComment = styled.div`
  display:flex;
  align-items:center;
  gap:10px;
`;

const Avatar = styled.img`
  width:40px;
  height:40px;
  border-radius:50%;
`;

const Input = styled.input`
  border:none;
  border-bottom:1px solid ${({theme})=>theme.soft};
  background-color:transparent;
  outline:none;
  padding:5px;
  width:100%;
`;



function Comments() {
  return (
    <Container>
      <NewComment>
        <Avatar src=''/>
        <Input placeholder='Add a Comment...'/>
      </NewComment>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </Container>
  )
}

export default Comments