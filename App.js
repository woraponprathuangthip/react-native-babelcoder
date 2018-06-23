import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";

export default class App extends React.PureComponent {
  state = {
    posts: []
  };

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    fetch("https://www.metaweather.com/api/location/1225448/2018/6/21")
      .then(res => res.json())
      .then(posts => this.setState({ posts: posts }));
  };

  showTime = now => {
    const time = new Date(now);
    return `${time.getHours()}:${time.getMinutes()}`;
  };

  numberInt = input => parseInt(input);

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Bangkok</Text>
        </View>
        <View style={styles.body}>
          <FlatList
            style={styles.lists}
            data={this.state.posts}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item: post }) => (
              <View key={post.id} style={styles.list}>
                <Text>{this.showTime(post.created)}</Text>
                <View>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: `https://www.metaweather.com/static/img/weather/png/${
                        post.weather_state_abbr
                      }.png`
                    }}
                  />
                </View>
                <Text>{this.numberInt(post.the_temp)}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch"
  },
  header: {
    alignItems: "center",
    backgroundColor: "red"
  },
  textHeader: {
    fontSize: 50,
    color: "white"
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "green"
  },
  button: {
    backgroundColor: "red"
  },
  lists: {
    margin: 20,
    width: "80%"
  },
  list: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  listHeader: {},
  listFooter: {
    flexDirection: "row",
    flex: 1
  },
  image: {
    aspectRatio: 1 / 1
  }
});
