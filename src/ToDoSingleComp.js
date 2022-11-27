import './App.css';
import {useState,useEffect} from 'react';

function ToDoSingleComp(props) {
const [inputVal,setInputVal] = useState('')
useEffect(()=>{
  const fetchData = async()=>{
    if(props.completed==='False'){
      setInputVal('False');
    }
    else{
      setInputVal('True');
    }
  }
  fetchData();
  },[props.completed])
  
  const btnComplted = (element)=>{
    console.log(element.target.id);
    element.target.className='overDataHidden';
    setInputVal('True');
    props.callback(-1)

  }
  return(
    <div>
    Title: <label>{props.title}</label>
                <br/> 
    Completed: <input name='inputVal' style={{border: "0px solid"}}  
                defaultValue = {inputVal}/>
    <button  onClick={(event) => {btnComplted(event)}} className={inputVal==='True'?'overDataHidden':'overDataVisible'}> Mark Completed</button>
      </div>
  )
}
  
export default ToDoSingleComp;
