import './App.css';
import {useState} from 'react';
import {addItem} from './utils';


function AddPost(props) {
  const [dataArray, setData] = useState([]);
  const [body,setBody] = useState('');
  const [title,setTitle] = useState('');
  const postUrl = 'https://jsonplaceholder.typicode.com/posts';
   
    const cancelAction = ()=>{
      props.callback(false)
    }
    const AddObj=async(e)=>{
      setData({
        userId: props.userId,
        title:title,
        body:body
      });
      const resp= await addItem(`${postUrl}`,dataArray);
      console.log(resp.data);
      props.callback(false);
    }

    return(
      
    <div className= 'newDivPost'>
    <div className='heaadlineNewPost'>
        New <label className='titleLabel'>Post</label> - user <label >{props.userId}</label>
      </div>
      <div className= 'titleAddPost'>
      Title: <input type='text' defaultValue={''} onChange={(e)=>setTitle(e.target.value)} />
      <br/>
      Body: <input type='text' defaultValue={''} onChange={(e)=>setBody(e.target.value)}/>
      <button className='buttonAddPost' onClick={AddObj}>Add</button>
      <button onClick={cancelAction}>Cancel</button>     
      </div>        
    </div>
  )
}

export default AddPost;
