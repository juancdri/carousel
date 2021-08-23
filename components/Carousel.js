import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import data from "../utils/data";

export const Carousel = () => {
    const [block, setBlock] = useState(0);
    const handleNext = () => {
        setBlock(block + 1)
    }
    const handlePrev = () => {
        setBlock(block - 1)
    }
    const urls = (a, b) => {
        return a[b].images[Math.floor(Math.random() * a[b].images.length)]
    }
    console.log(block)
    console.log(data)
    console.log(data[block].images[Math.floor(Math.random() * data[block].images.length)])
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text>CarouselApp</Text>
                <Text>{data[block].title}</Text>
            </View>
            <View style={styles.viewImg} >
                <Image source={urls(data, block)} style={styles.img} />
            </View>
            <View style={styles.btn}>
                <View style={styles.bt}>
                {block > 0 ? <Button onPress={handlePrev} title='Prev' /> : null}
                </View>
                <View style={styles.bt}>
                {block < data.length - 1 ? <Button onPress={handleNext} title='Next' /> : null}
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
    },
    title: {
        flex: 1,
        backgroundColor: '#00ff00',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    },
    viewImg: {
        flex: 8,
        height: "100%",
        width:"100%",
        },
    img: {
        height: "100%",
        width: "100%",
    },
    btn: {
        flex: 1,
        flexDirection: "row",
        justifyContent:'center'
    },
    bt:{
        padding: 20,
    }
});