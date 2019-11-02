import React, {useState} from 'react';
import styled from 'styled-components';

type Props = {
    index: string,
    syoyu: string,
    miso: string,
    tare: string,
    wiener: string
}

const UserLine: React.FC<Props> = (props:Props) => {
  return (
    <div>
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

const YLine = styled.div`
  display: inline-block;
  background: black;
  color: white;
  font-family: 'Impact', sans-serif;
  margin: 5px 2px;
  padding: 10px;
  width: 45%;
`;

const Ypt = styled.div`
  display: inline-block;
  background: black;
  color: white;
  font-family: 'Impact', sans-serif;
  margin: 5px 2px;
  padding: 10px;
  width: 15%;
`;

const YInput = styled.input`
  display: inline-block;
  padding: 10px;
  margin: 5px 2px;
  border-color: black;
`;

const YButton = styled.p`
  display: inline-block;
  font-family: 'Impact', sans-serif;
  margin: 0 5px;
`;
