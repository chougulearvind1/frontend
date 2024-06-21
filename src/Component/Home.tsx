import SideBar from './Home_Component/SideBar'
import TweetList from './Home_Component/TweetList'


const Home=()=>  {

   
     

    return (
      <div>
        <div className="row">
           <div className="col-1">

           </div>
           <div className="col-2">
           <SideBar></SideBar>
           </div>
           <div className="col-8">
           <TweetList></TweetList>
           </div>
           <div className="col-1">

           </div>
            
        </div>
       

      </div>
    )
  }


export default Home
