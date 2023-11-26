interface Props{
  type:String,
  color:String,
  space:String,

}



function Drive({type,color,space}:Props){
  const pStyle={
      width:space,
  }
return(
  <div className="drive-container mt-3  ms-3 p-1 ">
  <h4>{type}</h4>
  <div className="progress mb-2" role="progressbar" >
<div className={"progress-bar progress-bar-striped bg-"+color} style={{width:space.concat("%")}}>{space}%</div>
</div>
</div>
);
}
export default Drive;