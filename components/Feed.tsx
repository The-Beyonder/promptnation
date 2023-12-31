'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList=({data,handleTagClick}:{data: any, handleTagClick:Function})=>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post:any)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        handleEdit={()=>{}}
        handleDelete={()=>{}}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e:React.FormEvent)=>{

  }

  useEffect(()=>{

    const fetchPosts = async()=> {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
        type='text'
        placeholder="Search for tag or creator or prompt..."
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />
      </form>
      <PromptCardList 
      data={posts}
      handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed