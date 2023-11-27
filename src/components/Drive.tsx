import { useNavigate } from "react-router-dom";
import { useMyContext } from "../Context/globalPathContext";

interface Props{
    mountPoint:string,
    color:String,
    space:String,
    available_space:number,
    total_space:number,
    used_space:number,
    name:String
}



function Drive({name,mountPoint,color,space,available_space,total_space,used_space}:Props){
    const pStyle={
        width:space,
    }
  
  let usedGBper=((used_space/total_space)*100);
  
  
     if(usedGBper<30){
       color="success";
     }else if(usedGBper>30&&usedGBper<50){
       color="info";
     }else if(usedGBper>50&&usedGBper<75){
       color="warning";
     }else{
       color="danger";
     }
   
 
 const navigate=useNavigate();
  const context= useMyContext();


 function handleDiskCLick() {
   context.setGlobalState(mountPoint);
   navigate("List");   
  }

  return(
    <div className="drive-container mt-3  ms-3 p-1" onDoubleClick={()=>{handleDiskCLick()}}  style={{ cursor: 'pointer' }}>
    <h5>{name}({mountPoint})</h5>
    <div className="progress " role="progressbar" >
    <div className={"progress-bar progress-bar-striped progress-bar-animated bg-"+color} style={{width:usedGBper.toFixed(0).concat("%")}}>{usedGBper.toFixed(0)}%</div>
    </div>
    <div className="fs-6 text-white">{available_space}GB free of {total_space}GB</div>
</div>
  );
}
export default Drive;