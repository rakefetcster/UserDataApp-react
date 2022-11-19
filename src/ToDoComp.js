import './App.css';
import {useState, useEffect} from 'react';
import {getAll} from './utils';

function ToDoComp(props) {
  const [dataArray, setData] = useState([]);
  const [numCompleted, setCompleted] = useState(0);
  const todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  

  useEffect(()=>{
    const fetchData = async()=>{
      if(props.userId>0){
      const {data: todo}= await getAll(`${todoUrl}?userId=${props.userId}`);
      setCompleted(0)
      todo.forEach(element => {
        if(element.completed===0||element.completed===false|| !element.completed)
          setCompleted(numCompleted => numCompleted + 1 );
      });
      setData([]);
      setData(dataArray=>todo);
      }
    }
    fetchData();
    },[props.userId])
   
    
    const addTodo=()=>{
      props.callback(true)
    }
    const btnComplted = (element)=>{
      document.getElementById("input"+element.target.id).value = 'True'
      document.getElementsByName("btn"+element.target.id)[0].classList.remove('overDataVisible');
      document.getElementsByName("btn"+element.target.id)[0].classList.add('overDataHidden');
      setCompleted(numCompleted=>numCompleted-1);
      let ansArray = []
      if(numCompleted > 1)
        ansArray.push('False',0)
      else
        ansArray.push('True',props.userId)
      props.callback(ansArray)
    }

    return(
      
    <div className= ''>
    {props.userId>0?<div>
        Todos - User: <label >{props.userId}</label>
        <button  className='buttonAdd' id={props.userId} onClick={addTodo}>Add</button>
      </div>:''
    }
    
    {
        
      dataArray.map((dataItem)=>{
       
        return(
          <div key={dataItem.id} className='divToDo' >
            <br/>
            
            <div  className='insideDivToDO' >
                Title: <label>{dataItem.title}</label>
                <br/> 
                Completed: <input id={"input"+dataItem.id} style={{border: "0px solid"}}  defaultValue={dataItem.completed===1||dataItem.completed===true|| dataItem.completed?'True':'False'} />
                <button id={dataItem.id} name={"btn"+dataItem.id} onClick={(event) => {btnComplted(event)}} className={dataItem.completed===1||dataItem.completed===true|| dataItem.completed?'overDataHidden':'overDataVisible'}> Mark Completed</button>
           </div>
           <br/>
          </div>
        )
      })
      }
    </div>
  )
}

export default ToDoComp;
