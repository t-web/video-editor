import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Paper extends Component {
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
                transform: [{ translateY: this.state.translateY }]
              }]}>
                <Text onPress={this.save} style={styles.item}>
                    贴纸。。
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
                }
            ),
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 0
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
                }
            ),
            Animated.timing(
                this.state.translateY,
                {
                    toValue: 200
                }
            ),
        ]).start();
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101010',
        height: 200
    },
    item:{
        color: 'white'
    }
});
