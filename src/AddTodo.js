import './App.css';
import {useState} from 'react';
import {addItem} from './utils';


function AddTodo(props) {
  const [dataArray, setData] = useState([]);
  const [title,setTitle] = useState('');
  const postUrl = 'https://jsonplaceholder.typicode.com/posts';
   
    const cancelAction = ()=>{
      props.callback(false)
    }
    const AddObj=async(e)=>{
      setData({
        userId: props.userId,
        title:title,
        completed:'false'
      });
      const resp= await addItem(`${postUrl}`,dataArray);
      console.log(resp.data);
      props.callback(false);
    }

    return(
      
    <div className= 'newDivToDo'>
      <div className='heaadlineNewToDo'>
        New <label className='titleLabel'>Todo</label> - user <label >{props.userId}</label>
      </div>
      <div className= 'titleAddToDo'>
        Title: <input type='text' defaultValue={''} onChange={(e)=>setTitle(e.target.value)} />
        <br/>

        <button className='buttonAddToDO' onClick={AddObj}>Add</button>
        <button onClick={cancelAction}>Cancel</button>  
        </div>           
    </div>
  )
}

export default AddTodo;
