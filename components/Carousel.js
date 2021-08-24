// import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "expo-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export const Carousel = () => {
    const [block, setBlock] = useState(0);
    const [url, setUrl] = useState("");
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleNext = async () => {
        let b = 1 + parseInt(block);
        setBlock(b);
        await Storage.setItem({
            key: "BLOCK",
            value: JSON.stringify(b),
        });
        let imagen = urls(data, b);
        setUrl(imagen);
        await Storage.setItem({
            key: "URL",
            value: JSON.stringify(imagen),
        });
    };

    const handlePrev = async () => {
        let b = block - 1;
        setBlock(b);
        await Storage.setItem({
            key: "BLOCK",
            value: JSON.stringify(b),
        });
        let imagen = urls(data, b);
        setUrl(imagen);
        await Storage.setItem({
            key: "URL",
            value: JSON.stringify(imagen),
        });
    };
    const handleStart = async () => {
        const urlStorage = JSON.parse(await Storage.getItem({ key: "URL" }));
        const blockStorage = JSON.parse(await Storage.getItem({ key: "BLOCK" }));
        if (urlStorage && blockStorage) {
            setBlock(blockStorage);
            setUrl(urlStorage);
        }
        fetch(`https://testapi.io/api/juancdri/sports`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            })
            .catch((error) => console.error(error));
    };
    const urls = (array, index) => {
        return array[index].images[
            Math.floor((Math.random() * 100) % array[index].images.length)
        ];
    };

    useEffect(() => {
        console.log(data);
        if (data) {
            if (url === "") {
                Storage.setItem({
                    key: "BLOCK",
                    value: JSON.stringify(block),
                });
                let imagen = urls(data, block);
                setUrl(imagen);
                setLoading(false);
                Storage.setItem({
                    key: "URL",
                    value: JSON.stringify(imagen),
                });
            } else {
                setUrl(url);
                setBlock(block);
                setLoading(false);
            }
        }
    }, [data]);

    if (loading) {
        return (
            <View style={styles.start}>
                <Button onPress={handleStart} title="Start" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>CarouselApp</Text>
                    {data.length ? <Text>{data[block].title}</Text> : null}
                </View>
                <View style={styles.viewImg}>
                    <Image source={{ uri: `${url}` }} style={styles.img} />
                </View>
                <View style={styles.btn}>
                    <View style={styles.bt}>
                        {block > 0 ? <Button onPress={handlePrev} title="Prev" /> : null}
                    </View>
                    <View style={styles.bt}>
                        {block < data.length - 1 ? (
                            <Button onPress={handleNext} title="Next" />
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }
};
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
        flex: 7,
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
        marginBottom: 20,
        marginTop: 20
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