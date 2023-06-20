import Card from "./Card";
import ProfileCard from "./ProfileCard";
import RightSide from "./RightSide";
import SideBar from "./SideBar";
import Treding from "./Treding";

function LayOut({ children, page }) {
  let maxWidth = 'max-w-8xl';
  let width1 = 'w-[10%]';
  let width2 = 'w-[80%]';

  if (page === 'home') {
    maxWidth = 'max-w-8xl';
    width1 = 'w-[10%]';
    width2 = 'w-[60%]';
  }

  return (
    <div className={`flex mt-4 ${maxWidth} mx-auto gap-6`}>
      <div className={width1} style={{ marginLeft: '20px' }}>
        <SideBar />
      </div>
      <div className={width2} style={{ marginRight: '30px' }}>
        <div>{children}</div>
      </div>
      {page === 'home' && (

        <div className="w-[20%]">
        <div>
        <ProfileCard/>
        </div>
          <RightSide />
          <Treding/>
        </div>
      )}

    </div>
  );
}

export default LayOut


// style={{marginLeft: '-376px',marginRight: '334px',paddingLeft: '22px'}}