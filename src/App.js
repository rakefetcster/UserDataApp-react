import {useState} from 'react';
import ChildComp from './ChildComp'
import ToDoComp from './ToDoComp'
import PostComp from './PostComp'
import UserComp from './UserComp'
import AddPost from './AddPost'
import AddTodo from './AddTodo'



const App= () =>{
  const [userId,setUserId] = useState(0);
  const [boxId,setBoxId] = useState(0);
  const [divColor,setDivColor] = useState('black');
  const [Add,setAdd] = useState(false);
  const [AddPostParam,setAddPost] = useState(false);
  const [AddtodoParam,setAddTodo] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');

  const getUserId = (childValue)=>{
    if(childValue==='Add'){
      setAdd(true);
    }
    else {
    setUserId(childValue);
    }
  }
  const addPost=(childValue)=>{
    setAddPost(childValue)
  }
  const AddToDo = (childValue)=>{
    setAddTodo(childValue)
  }
  const addUser=(childValue)=>{
    if (childValue[0]===false){
      Add(childValue);
    }
    else{
      setName(childValue.name)
      setEmail(childValue.email)
      setAdd(false);
    }

  }
  const getanswer = (childValue)=>{
    if(childValue===true){
      setAddTodo(childValue)
    }
    if (childValue[0]==='True'){
      setDivColor('green');
      setBoxId(childValue[1]);
    }
    
    }
  
  if(Add===true){
    return (
      <div className="main">
        <div className = "left" >
        
      <ChildComp divColor={divColor} boxId={boxId}  callback={addUser}/>
    </div> 
    <div className = "right" >
    
      <UserComp callback={addUser}/>
    
    </div>
  </div>
    );
  }
  else{
  return (
    <div className="main">
      <div className = "left" >
      
    <ChildComp divColor={divColor} boxId={boxId} name={name} email={email} callback={getUserId}/>
  </div> 
  <div className = "right" >
  
    
  {AddtodoParam===true?<AddTodo userId={userId} callback={AddToDo}/>:<ToDoComp userId={userId} callback={getanswer}/>}
  <br/>
  {AddPostParam===true?<AddPost userId={userId} callback={addPost}/>:<PostComp userId={userId} callback={addPost}/>}

  
  </div>
</div>
  );
  }
}

export default App;
