import React,{useState} from "react";
import {StyleSheet, Text, View, Image, Button} from "react-native";
import data from "../../utils/data";

export const Carousel=()=>{
    const [block, setBlock]= useState(0);
const handleNext = ()=>{
setBlock(block+1)
}
const handlePrev = ()=>{
    setBlock(block-1)
}


return(
   <View>
       {block>0?<Button onPress={handlePrev}>Prev</Button>:null}}
       {block<data.length-1?<Button onPress={handleNext}>Next</Button>:null}
    {/* {data.map((e, i)=>{

    })} */}

   </View>

)


}