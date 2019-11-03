import React,{useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Loading from './components/Loading'
import UserLine from './components/userLine'
import PostForm from './components/PostForm'
import './App.css'
import Env from "./firebase"

const App: React.FC = () => {

  const [userList, setUserList] = useState<{
    index: string,
    time: string|Date,
    syoyu: string,
    miso: string,
    tare: string,
    wiener: string,
    isComplete: string|boolean,
    getAllUserData: () => void
  }[]>([]);

  const [togglePage,switchPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reanderList, setReanderList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    userList.sort((a, b) => {
      if (parseInt(a.index) > parseInt(b.index)) return -1;
      if (parseInt(a.index) < parseInt(b.index)) return 1;
      return 0;
  });
    userList.unshift({
      index: "受付番号",
      time: "注文時刻",
      syoyu: "醤油",
      miso: "味噌",
      tare: "タレ",
      wiener: "ｳｨﾝﾅｰ",
      isComplete: "提供状況",
      getAllUserData: getAllUserData
    })
    setReanderList(userList.map(user => (
      <UserLine
        index= {user.index}
        time= {user.time}
        syoyu= {user.syoyu}
        miso= {user.miso}
        tare= {user.tare}
        wiener= {user.wiener}
        isComplete= {user.isComplete}
        getAllUserData= {getAllUserData}
      />
      )
    ));
  }, [userList]);

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = useCallback(()=>{
    setIsLoading(true);
    Env.instance.firestore
      .collection("requests")
      .get()
      .then(result => {
        setUserList(
          result.docs.map(doc => {
            return {
              index: doc.id,
              time: doc.data().time,
              syoyu: doc.data().syoyu,
              miso: doc.data().miso,
              tare: doc.data().tare,
              wiener: doc.data().wiener,
              isComplete: doc.data().isComplete,
              getAllUserData: getAllUserData
            }
          })
        );
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      })
  },[])

  return (
    <MainBack>
      {isLoading && <Loading/>}
      <YButton onClick={getAllUserData}>
        <b>ページ更新</b>
      </YButton>
      <YButton onClick={()=>switchPage(!togglePage)}>
        <b>ページ切り替え</b>
      </YButton>
      {togglePage ?<PostForm />:reanderList}
    </MainBack>
  );
}
const MainBack = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 250;
  font-family: 'arial black', sans-serif;
`;

const YButton = styled.button`
  background: black;
  color: white;
  font-family: 'Impact', sans-serif;
  margin: 2px;
  padding: 10px;
  width: 20%;
`;

export default App;
