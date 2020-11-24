import React, { useEffect } from "react";
import useAdobeAnalytics from "./useAdobeAnalytics";

export default function App() {
  const { track } = useAdobeAnalytics();

  useEffect(() => {
    track({
      page: {
        pageInfo: {
          pageName: [],
          primaryCategory: [],
          subCategory: []
        },
      user: [
        {
          profile: [
            {
              profileInfo: {
                profileID: [],
                },
              }
          ]
        }
      ],
    }
    });
  }, []);

  return <div className="App"></div>;
}
