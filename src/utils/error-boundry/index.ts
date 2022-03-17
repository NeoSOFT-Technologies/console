import{ Component, ErrorInfo, ReactNode } from "react";

interface IProperty {
  children: ReactNode;
}

class ErrorBoundary extends Component<IProperty> {
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Caught error:Error FOund", error, errorInfo);
  }

  public render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
