import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { getProfilePicture } from "../services/api";
import { formatDate } from "../utils/date";

const Card = ({ profilePicture, name, _id, validity }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const backgroundImage = require("../assets/background1.png");

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.card, isLandscape && styles.cardLandscape]}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.profilePictureContainer}>
        <Image
          source={getProfilePicture(profilePicture)}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.content}>ID: {_id}</Text>
        <Text style={styles.content}>Válido até {formatDate(validity)}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#60b275",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  backgroundImage: {
    resizeMode: "cover", 
  },
  infoContainer: {
    alignItems: "left",
    marginLeft: 20,
  },
  cardLandscape: {
    alignSelf: "center",
    width: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#333",
  },
  profilePictureContainer: {
    alignItems: "left",
    marginTop: 5,
    marginRight: 5,
  },
  profilePicture: {
    width: 60,
    height: 70,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "left",
  },
});

export default Card;
