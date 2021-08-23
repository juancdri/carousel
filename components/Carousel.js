import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from "react-native";

export const Carousel = () => {
    const [block, setBlock] = useState(0);
    const [url, setUrl] = useState('')
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)

    const handleNext = async () => {
        let b = 1 + parseInt(block)
        setBlock(b)
        await AsyncStorage.setItem('BLOCK', b)
        let imagen = urls(data, b)
        setUrl(imagen)
        AsyncStorage.setItem('URL', imagen)
    }

    const handlePrev = async () => {
        let b = block - 1
        setBlock(b)
        await AsyncStorage.setItem('BLOCK', b)
        let imagen = urls(data, b)
        setUrl(imagen)
        AsyncStorage.setItem('URL', imagen)
    }
    const handleStart =() =>{
        setLoading(false)
    }
    const urls = (a, b) => {
        return a[b].images[Math.floor(Math.random() * 100 % (a[b].images.length))]
    }

    useEffect(async() => {
        const laurl = await AsyncStorage.getItem('URL')
        const elblock = await AsyncStorage.getItem('BLOCK')
        
        fetch(`https://testapi.io/api/juancdri/sports`)
            .then((response) => response.json())
            .then((json) => {
                setData(json)
                if (laurl == null) {
                    AsyncStorage.setItem('BLOCK', block)
                    let imagen = urls(json, block)
                    setUrl(imagen)
                    AsyncStorage.setItem('URL', imagen)
                } else {
                    setUrl(laurl)
                    setBlock(elblock)
                }})
            .catch((error) => console.error(error))

    }, [])

    if (loading) {
        return (<View style={styles.start}>
            <Button onPress={handleStart} title='Start' />
        </View>)
    }
    else {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>CarouselApp</Text>
                    {data ? <Text>{data[block].title}</Text> : null}
                </View>
                <View style={styles.viewImg} >
                    <Image source={url} style={styles.img} />
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
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    title: {
        flex: 1,
        backgroundColor: '#00ff00',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    viewImg: {
        flex: 8,
        height: "100%",
        width: "100%",
    },
    img: {
        height: "100%",
        width: "100%",
    },
    btn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center'
    },
    bt: {
        marginBottom:20,
        marginTop:20
    },
    start: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});