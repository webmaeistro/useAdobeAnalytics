import React, { useEffect } from "react";
import useAdobeAnalytics from "./useAdobeAnalytics";

export default function App() {
  let { track } = useAdobeAnalytics();

  useEffect(() => {
    track({
      pageName: "some:page:name",
      subCategory: "value"
    });
  }, []);

  return <div className="App">lksdjflskdjfslkdjfs sdflkjslskdf</div>;
}
