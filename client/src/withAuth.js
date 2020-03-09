import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
          super();
          this.state = {
            loading: true,
          };
        }

        componentDidMount() {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
          if (decoded.type === "admin") {
            this.setState({ loading: false });
          }
        }

        render() {
          const { loading } = this.state;
          if (loading) {
            return null;
          }

          return <ComponentToProtect {...this.props} />;
        }
    }
}