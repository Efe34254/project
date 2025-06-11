import React from 'react';
import { View, Text, Button } from 'react-native';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // Hata logunu burada kaydedebilirsiniz (örn. Sentry, Bugsnag)
    console.log("ErrorBoundary caught:", error, info);
  }
  handleReload = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'red', fontSize: 18, marginBottom: 12 }}>Something went wrong!</Text>
          <Button title="Try Again" onPress={this.handleReload} />
        </View>
      );
    }
    return this.props.children;
  }
}
// See shared code above
