
const QuickAccess=()=>{

 return(
<div className="container-fluid mt-5">
<div className="mt-4 ms-5">
<h5 className="mb-4 text-white">QuickAccess</h5>
  <div className="row row-cols-3 align-items-center gy-5">
    <div className="col text-white " ><img src="src\assets\Home.png" className="me-2 quick-icon-size" /><button onDoubleClick={()=>{
      
    }}></button></div>
    <div className="col text-white"><img src="src\assets\download.png" className="me-2 quick-icon-size" />Download</div>
    <div className="col text-white"><img src="src\assets\document-folder.png" className="me-2 quick-icon-size" />Documents</div>
    <div className="col text-white"><img src="src\assets\image-folder.png" className="me-2 quick-icon-size"  />Picture</div>
  </div>
</div>
<hr style={{backgroundColor:"white",height:"3px"}} />
</div>
 );

}

export default QuickAccess;