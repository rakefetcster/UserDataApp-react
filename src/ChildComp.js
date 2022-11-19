import {useState, useEffect} from 'react';
import {getAll, updateItem, deleteItem} from './utils'
import './App.css';

const ChildComp=(props) =>{

  const [dataArray, setData] = useState([])
  const [user,setUser] = useState({name:dataArray.name,email:dataArray.name})
  const [address,setAddress] = useState({street:'',city:'',zipcode:''})
  const[search,setSearch] = useState('');
  const userUrl = 'https://jsonplaceholder.typicode.com/users';
  let moreDetails = false;
  
  useEffect(()=>{
    const fetchData = async()=>{
      const {data: user}= await getAll(userUrl);
      if(search === ''){
        if (props.name !=='' ){
        user.push({id:user[user.length-1].id+1,
              name:props.name,
              email:props.email})
        }
        setData(user)
        
      }
      else{
        let returnArray = [];
        user.map((res)=>{
          if(res.name.includes(search)){
              returnArray.push(res)
          }
          else if(res.email.includes(search)){
            returnArray.push(res)
          }
          if (props.name !=='' ){
                user.push({id:user[user.length-1].id+1,
                  name:props.name,
                  email:props.email})
          }
          setData(returnArray);
        })
      }
    }
    fetchData();
  },[search,moreDetails,props.name,props.email],)
  
  
  const getOtherData= (event,moreDetails)=>{
    if(moreDetails === false){
      document.getElementById('div'+event.target.id).classList.remove('overDataHidden');
      document.getElementById('div'+event.target.id).classList.add('overDataVisible');
      document.getElementById('div'+event.target.id).style.display="block"
  }
  else if (moreDetails === true){
    document.getElementById('div'+event.target.id).classList.remove('overDataVisible');
      document.getElementById('div'+event.target.id).classList.add('overDataHidden');
      document.getElementById('div'+event.target.id).style.display="none"
    }
  
  }
  const Update=async(event)=>{
      
      let obj = {}
      obj = {name:user.name,
            email:user.email,
            address:{street:address.street,
                    city:address.city,
                    zipcode:address.zipcode}
            }

      const {data}= await updateItem(userUrl,event.target.id,obj);
      console.log(data)
  }
  const Delete=async(event)=>{
    const {data}= await deleteItem(userUrl,event.target.id)
    console.log(data)
  }
  const handleColorId=(event)=>{
    document.getElementById('fullDiv'+event.target.id).style.border="2px solid orange";
    props.callback(event.target.id);
  }
  const getUser=(e)=>{
    props.callback('Add');
  }
  return(
    <div>
    <div className='searchDiv'>
      <label className='searchLabel'>Search:</label><textarea  rows="2" cols="10" className='searchBox' onChange={(e)=>setSearch(e.target.value)}></textarea >
      <button onClick={getUser}>Add</button>
      </div>
      <br/>
    {
      
      dataArray.map((dataItem,index)=>{
       
        return(
          <div key={index} name={"divFull"} id = {'fullDiv'+dataItem.id} className='divchild' style={{borderColor: props.boxId==dataItem.id? props.divColor: 'red'}} >
              <div className='divStart'>
              <label className='titleLabel'>ID:</label> <label  id={dataItem.id} onClick={(event) => {handleColorId(event)}}>{dataItem.id}</label>
              <br/>
              <label className='titleLabel'>Name:</label> <input className='inputField'  type='text' defaultValue={dataItem.name} onChange={(e)=>setUser({...user,name:e.target.value})} />
              <br/>
              <label className='titleLabel'>Email:</label> <input className='inputField' type='text' defaultValue={dataItem.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
              </div>
              <button  id={dataItem.id} onClick={(event) => {getOtherData(event,true)}}  onMouseOver={(event) => {getOtherData(event,false)}}> Other Data</button>
              <div  style={{display: "none"}} id={'div'+dataItem.id} className= 'overDataHidden'>
              <div className='divStart'>
              <label className='titleLabel'>Street:</label> <input className='inputField' type='text' id = {'div'+dataItem.id} defaultValue={dataItem.address?.street} onChange={(e)=>setAddress({...address, street:e.target.value})} />
              <br/> 
              <label className='titleLabel'>City:</label> <input  className='inputField' type='text' id = {'div'+dataItem.id} defaultValue={dataItem.address?.city} onChange={(e)=>setAddress({...address,city:e.target.value})} />
              <br/> 
              <label className='titleLabel'>Zip Code:</label> <input className='inputField'  type='text' id = {'div'+dataItem.id} defaultValue={dataItem.address?.zipcode} onChange={(e)=>setAddress({...address,zipcode:e.target.value})} />
              <br/>
              </div>
              </div> 
              <button className='updateBotton'   id={dataItem.id} onClick={Update}>Update</button>
              <button id={dataItem.id} onClick={Delete}>Delete</button>
              </div>
        )
        
      })//end map
    }
  
      
    </div>
  
    )//end return
}

export default ChildComp;
