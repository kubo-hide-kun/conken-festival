import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Loading from './Loading';
import Env from "../firebase"

type Props = {
    index: string,
    time: string|Date,
    syoyu: string,
    miso: string,
    tare: string,
    wiener: string,
    isComplete: string|boolean
}

const UserLine: React.FC<Props> = (props:Props) => {

  const [isComplete, setIsComplete] = useState(props.isComplete);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const switchIsComplete = useCallback(()=>{
    setIsLoading(true);
    Env.instance.firestore
      .collection("requests")
      .doc(props.index)
      .update({
        time: props.time,
        syoyu: props.syoyu,
        miso: props.miso,
        tare: props.tare,
        wiener: props.wiener,
        isComplete:!props.isComplete
      })
      .then(result => {
        console.log(result);
        setIsLoading(false);
        setIsComplete(!isComplete);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      })
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
          props.isComplete=="提供状況"
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
