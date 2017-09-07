import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanel: true,
            fadeAnim: new Animated.Value(0),
            translateY: new Animated.Value(50),
        }
    }
    render() {
        return (
            <Animated.View style={[styles.container,{
                ...this.props.style,
                opacity: this.state.fadeAnim,
                transform:[{translateY: this.state.translateY}]
              }]}>
                <Text onPress={this.save} style={styles.item}>
                    滤镜
                </Text>
            </Animated.View>
        );
    }

    /* 渲染完成时执行 */
    componentDidMount() {
        Animated.parallel([                             // 并行执行
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.state.fadeAnim,                    // 动画中的变量值
                {
                    toValue: 1,                         // 透明度最终变为1，即完全不透明
                    duration: 200
                }
            ),
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 0,
                    duration: 200
                }
            ),
        ]).start();
    }

    /* 卸载组件时执行 */
    componentWillUnmount() {
        Animated.parallel([                             // 并行执行
            Animated.timing(                            // 随时间变化而执行的动画类型
                this.state.fadeAnim,                    // 动画中的变量值
                {
                    toValue: 0,                         // 透明度最终变为1，即完全不透明
                    duration: 200
                }
            ),
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 200,
                    duration: 200
                }
            ),
        ]).start();
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#101010',
        height: 200
    },
    item: {
        color: 'lightgray',
        lineHeight: 30,
        height: 30,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    title: {
        color: 'lightgray'
    }
});
