import React, { Component } from "react";
const withFetching = (Wrapped, Loading, loader) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { data: null, loading: null };
    }

    componentDidMount = async () => {
      this.setState({ loading: true });
      await this.loadData();
    };

    loadData = async () => {
      if (typeof loader === "function") {
        try {
          const data = await loader();
          this.setState({ data, loading: false });
        } catch (error) {
          this.setState({ loading: false });
        }
      }
    };

    render() {
      let comp =
        this.state.loading === true ? (
          <Loading />
        ) : (
          <Wrapped payload={this.state.data} reload={this.loadData} />
        );

      return comp;
    }
  };
};

export default withFetching;
