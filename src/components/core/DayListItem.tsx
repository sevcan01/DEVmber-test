import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


type DayListItem ={
day:number,
}

const DayListItem = ({day}:DayListItem) => {
   
  return (
    <Link href={`/day${day}`} asChild>
    <Pressable style={styles.box} >
    <Text style={styles.text}>{day}</Text>
   
   </Pressable>
    </Link>
  )
}

export default DayListItem

const styles = StyleSheet.create({

    box: {
        backgroundColor:'#F9EDE3',
       
        flex:1,
        aspectRatio:1,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:20,
        color: '#9b4521',
        justifyContent:'center',
        alignItems:'center'
      
        },
        text: {
          color: '#9b4521',
          fontSize: 70,
          fontFamily:'AmaticBold'
        },

    })