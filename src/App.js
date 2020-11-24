import React, { useEffect } from "react";
import useAdobeAnalytics from "./useAdobeAnalytics";

export default function App() {
  const { track } = useAdobeAnalytics();

  useEffect(() => {
    track({
      page: {
        pageInfo: {
          pageName: {},
          sectionName: {},
          primaryCategory: {},
          subCategory: {}
        },
      user: [
        {
          profile: [
            {
              profileInfo: {
                profileID: {},
                },
              }
          ]
        }
      ],
    }
    });
  }, [track]);

  return <div className="App"></div>;
}
