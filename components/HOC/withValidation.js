import React, { Component } from "react";

const withValidation = (Wrapped, validators) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { errors: [], value: "" };
    }
    validateOnChange = (value) => {
      this.setState({ value });

      if (Array.isArray(validators)) {
        const errors = [];
        validators.forEach((validator) => {
          if (typeof validator === "function") {
            const result = validator(value);
            if (!result.isValid) {
              errors.push(result.message);
            }
          }
        });
        let errorsAvailable = errors.length === 0 ? true : false;
        this.props.onChanged(value, errorsAvailable);
        this.setState({ errors });
      }
    };

    render() {
      return (
        <Wrapped
          validateOnChange={() => this.validateOnChange()}
          errors={this.state.errors}
          {...this.props}
        />
      );
    }
  };
};

export default withValidation;
