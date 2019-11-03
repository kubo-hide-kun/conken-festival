import React, {useState, useCallback} from 'react';
import Button from '@material-ui/core/Button'
import BlockIcon from '@material-ui/icons/Block';
import styled from 'styled-components';
import Loading from './Loading';
import Env from "../firebase"

type Props = {
    index: string|number,
    time: string|Date,
    syoyu: string|number,
    miso: string|number,
    tare: string|number,
    wiener: string|number,
    isComplete: string|boolean,
    getAllUserData: () => void
}

const UserLine: React.FC<Props> = (props:Props) => {

  const [syoyu, setSyoyu] = useState(props.syoyu);
  const [miso, setMiso] = useState(props.miso);
  const [tare, setTare] = useState(props.tare);
  const [wiener, setWiener] = useState(props.wiener);
  const [isComplete, setIsComplete] = useState(props.isComplete);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchIsComplete = useCallback(()=>{
    props.getAllUserData();
    setIsLoading(true);
    Env.instance.firestore
      .collection("requests")
      .doc(props.index+'')
      .update({
        time: props.time,
        syoyu: props.syoyu,
        miso: props.miso,
        tare: props.tare,
        wiener: props.wiener,
        isComplete:!props.isComplete
      })
      .then(() => {
        console.log("()=>",isComplete);
        setIsLoading(false);
        setIsComplete(!isComplete);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      })
  },[props,isComplete])


  const CancellOrder = useCallback(()=>{
    if(window.confirm("本当に"+props.index+"の注文を削除しても良いですか?")) {
      props.getAllUserData();
      setIsLoading(true);
      Env.instance.firestore
        .collection("requests")
        .doc(props.index+'')
        .update({
          time: props.time,
          syoyu: 0,
          miso: 0,
          tare: 0,
          wiener: 0,
          isComplete: true
        })
        .then(() => {
          console.log("remove",props.index);
          setIsLoading(false);
          setSyoyu(0);
          setMiso(0);
          setTare(0);
          setWiener(0);
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        })
    }
  },[props,isComplete])

  return (
    <div>
      {isLoading && <Loading/>}
      <div>
        <Ynum>
          <b>{props.index}</b>
        </Ynum>
        <Ynum>
          <b>{props.syoyu}</b>
        </Ynum>
        <Ynum>
          <b>{props.miso}</b>
        </Ynum>
        <Ynum>
          <b>{props.tare}</b>
        </Ynum>
        <Ynum>
          <b>{props.wiener}</b>
        </Ynum>
        {
          (miso == 0 
            && syoyu == 0 
            && tare == 0
            && wiener == 0
          )
          ?<Ynum>
          <b>キャンセルしました</b>
          </Ynum>
          :props.isComplete=="提供状況"
          ?<Ynum>
            <b>提供状況</b>
          </Ynum>
          :isComplete
          ?(<GreenFlag onClick={switchIsComplete}>
            <b>提供済み</b>
          </GreenFlag>)
          :(<RedFlag onClick={switchIsComplete}>
          <b>未提供</b>
        </RedFlag>)
        }
        <Button onClick={CancellOrder}>
          <BlockIcon />
        </Button>
    </div>
  </div>)
}

export default UserLine;

const Ynum = styled.div`
  display: inline-block;
  background: black;
  color: white;
  font-family: 'Impact', sans-serif;
  margin: 5px 2px;
  padding: 10px;
  width: 10%;
`;

const RedFlag = styled.div`
display: inline-block;
background: red;
color: white;
font-family: 'Impact', sans-serif;
margin: 2px;
padding: 10px;
width: 10%;
`

const GreenFlag = styled.div`
display: inline-block;
background: green;
color: white;
font-family: 'Impact', sans-serif;
margin: 2px;
padding: 10px;
width: 10%;
`
