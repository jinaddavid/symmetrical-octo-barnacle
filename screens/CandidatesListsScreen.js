import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import service from "../model/DelayedCandidateService";
// import service from "../model/CandidateService";
import withFetching from "../components/HOC/withFetching";

import LoadingIndicator from "../components/LoadingIndicator";
import CandidateRowItem from "../components/CandidateRowItem";
import { withNavigation } from "react-navigation";
import NavigationService from "../navigation/NavigationService";
// import NavigationService from "./navigation/NavigationService";

class CandidatesListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const { navigation, payload } = this.props;
    // if (navigation) {

    // }
    if (navigation) {
      console.log("eterrrr");
      navigation.setParams({
        onSubmited: async (candidate) => {
          console.log(candidate, "candidatecandidatecandidatecandidate");
          const added = await service.addCandidate(candidate);
          console.log(added, "added");
          const { candidates } = this.state;
          this.setState({ candidates: [...candidates, added] });

          navigation.goBack();
        },
      });
    }
    this.state = { candidates: payload };
  }

  componentDidMount() {
    const { navigation, payload } = this.props;
  }

  onSubmited = async (candidate) => {
    const added = await service.addCandidate(candidate);
    console.log(added, "added");
    const { candidates } = this.state;
    this.setState({ candidates: [...candidates, added] });

    navigation.goBack();
  };

  onUpdated = ({ id, name, surname, avatarUrl }) => {
    const { candidates } = this.state;

    const index = candidates.findIndex((v) => v.id === id);

    this.setState({
      candidates: [
        ...candidates.slice(0, index),
        {
          id,
          name,
          surname,
          avatarUrl,
        },
        ...candidates.slice(index + 1),
      ],
    });
  };

  render() {
    const { navigation } = this.props;
    const { candidates } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={candidates}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("CandidateProfile", {
                  id: item.id,
                  onUpdated: this.onUpdated,
                })
              }
            >
              <View>
                <CandidateRowItem {...item} />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={({ id }) => id.toString()}
        />
      </View>
    );
  }
}

const fetcher = async () => service.fetchCandidates();

export default withNavigation(
  withFetching(CandidatesListScreen, LoadingIndicator, fetcher)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
