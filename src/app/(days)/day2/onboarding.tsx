import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { BounceIn, BounceInRight, BounceOutLeft, FadeIn, FadeOut, SlideInLeft, SlideInRight, SlideOutLeft } from "react-native-reanimated";

const onboardingSteps = [
  {
    icon: "snowflake",
    tittle: "Welcome #DEVember",
    description: "Daily React Native tutorials during December",
  },
  {
    icon: "people-arrows",
    tittle: "Learn and grow together",
    description: " Learn by building 24 projects with React Native and Expo",
  },
  {
    icon: "book-reader",
    tittle: "Education for Children",
    description:
      "Contribute to the fundraiser 'Education for Children' to help Save the Chlildren in their effort of providing education to every child. ",
  },
];

export default function OnbordingScreen() {
  const [screenIndex, setScreenIndex] = useState(0);
  const data = onboardingSteps[screenIndex];

  const onContinue = () => {
    const isLastScreen = screenIndex === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex + 1);
    }
  };
  const onBack = () => {
    const isFirstScreen = screenIndex === 0
    if (isFirstScreen) {
      endOnboarding();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  const endOnboarding = () => {
    setScreenIndex(0);
    router.back();
  };

  const swipeForward = Gesture.Fling()
  .direction(Directions.LEFT)
  .onEnd((event)=>{
onContinue()
})

const swipeBackward = Gesture.Fling()
.direction(Directions.RIGHT)
.onEnd((event)=>{
onBack()
})
const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
    )


  return (
    <SafeAreaView style={styles.page}>
    <Stack.Screen options={{ headerShown: false }} />
    <StatusBar style="light" />

    <View style={styles.stepIndicatorContainer}>
      {onboardingSteps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.stepIndicator,
            { backgroundColor: index === screenIndex ? '#CEF202' : 'grey' },
          ]}
        />
      ))}
    </View>

    <GestureDetector gesture={swipes}>
      <View style={styles.pageContent} key={screenIndex}>
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <FontAwesome5
            style={styles.image}
            name={data.icon}
            size={150}
            color="#CEF202"
          />
        </Animated.View>

        <View style={styles.footer}>
          <Animated.Text
            entering={SlideInRight}
            exiting={SlideOutLeft}
            style={styles.title}
          >
            {data.tittle}
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(50)}
            exiting={SlideOutLeft}
            style={styles.description}
          >
            {data.description}
          </Animated.Text>

          <View style={styles.buttonsRow}>
            <Text onPress={endOnboarding} style={styles.buttonText}>
              Skip
            </Text>

            <Pressable onPress={onContinue} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </GestureDetector>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    // alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#15141A",
    padding: 20,
  },
  image: {
    alignSelf: "center",
    margin: 20,
    marginTop:50,
  },
  title: {
    color: "#FDFDFD",
    fontSize: 50,
    fontFamily: "InterBlack",
    letterSpacing: 1.3,
    marginVertical: 15,
  },
  description: {
    color: "gray",
    fontSize: 20,
    fontFamily: "Inter",
    lineHeight: 28,
  },
  footer: {
    marginTop: "auto",
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    backgroundColor: "#302E38",
    // padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    color: "#FDFDFD",
    fontSize: 16,
    fontFamily: "InterBold",
    padding: 15,
    paddingHorizontal: 25,
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    gap:7
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: "gray",
    
    borderRadius: 10,
  },
});
