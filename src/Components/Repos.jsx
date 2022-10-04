import React from "react"
import axios from "axios"

const Repos = ({ repos_url }) => {
  const [repos, setRepos] = React.useState([])
  const [pageNum, setPageNum] = React.useState(0)

  const handleNextButton = () => {
    setPageNum((currPage) => (
      currPage === parseInt(repos.length-1) ? 
        repos.length-1 : currPage+1
    ))
  }

  const handlePrevButton = () => {
    setPageNum((currPage) => (
      currPage === 0 ?
        0: currPage-1
    ))
  }

  const setPageRepos = (reposData) => {
    let j=0;
    const reposCount = reposData.length;
    console.log("Hello")
    console.log(reposCount)
    let pageRepos=[]
    let overallRepos=[]
    while(j < reposCount)
    {
      if(j % 6 == 0 || j == reposCount-1)
      {
        if(pageRepos.length > 0)
        {
          overallRepos.push(pageRepos);
        }
        pageRepos=[]
      }
      pageRepos.push(reposData[j])
      j++;
    }
    return overallRepos
  }
  const fetchRepos = async () => {
    const {data} = await axios.get(repos_url)
    console.log(data);
    setRepos(setPageRepos(data));
    setPageNum(0)
    //setRepos(data)
  }

  React.useEffect(() => {
    fetchRepos()
  }, [repos_url])

  return (
    <div className="repos">
       {repos.length>0 && repos[pageNum].map((repo) => (
        <div className="repoDetails" key={repo.id}>
          <p className="repoName">{repo.name}</p>
          {repo.language ? <p>{repo.language}</p> : null}
          <p>{repo.description}</p>
        </div>
      ))} 
      <div className="repoButtons">
        <button className="prevNextButton"
        onClick = {handlePrevButton}
        >
          Previous
        </button>
        <p>{pageNum+1} / {repos.length}</p>
        <button className="prevNextButton"
        onClick = {handleNextButton}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Repos
