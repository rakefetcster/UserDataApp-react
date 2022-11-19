import './App.css';
import {useState, useEffect} from 'react';
import {getAll} from './utils';

function PostComp(props) {
  const [dataArray, setData] = useState([]);
  const postUrl = 'https://jsonplaceholder.typicode.com/posts';
  

  useEffect(()=>{
    const fetchData = async()=>{
      if(props.userId>0){
        const {data: post}= await getAll(`${postUrl}?userId=${props.userId}`);
        setData([]);
        setData(dataArray=>post);
      }
    }
    fetchData();
    },[props.userId])
   const addPost=()=>{
    props.callback(true);
   }
    return(
      
    <div className= ''>
    {props.userId>0?<div>
        Posts - User: <label >{props.userId}</label>
        <button  id={props.userId} className='buttonAddPost' onClick={addPost}>Add</button>
      </div>:''
    }
    
    {
        
      dataArray.map((dataItem)=>{
       
        return(
          <div key={dataItem.id} className='divPost'>
            <br/>
            
            <div className='insideDivPost'>
                Title: <label>{dataItem.title}</label>
                <br/> 
                Body: <input id={"body"+dataItem.id} style={{border: "0px solid"}}  defaultValue={dataItem.body} />
                
           </div>
           <br/>
          </div>
        )
      })
      }
    </div>
  )
}

export default PostComp;
