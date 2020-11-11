import { useState, useEffect } from "react";

let satelliteScriptPromise, satelliteScriptLoaded;

/* eslint-disable */
// Function.prototype.clone = function(args) {
//   console.log("args", args, arguments);
//   const that = this;
//   return function temp() {
//     return that.apply(this, arguments);
//   };
// };

let useAdobeAnalytics = (digitalDataOrOptions) => {
  let [initialized, setInitialized] = useState(false);
  let [queuedFns, setQueuedFns] = useState([]);

  let callQueuedFns = () => {
    console.log("should fire queued fns");
    console.log("queued", queuedFns);
    queuedFns.forEach((f) => {
      if (typeof f.fn === "function") {
        console.log("f.args", f.args);
        f.fn(...f.args);
      }
    });
  };

  var track = function (...args) {
    console.log("track called", ...args);
  };

  var trackNotReady = function (...args) {
    console.log("track not ready");
    setQueuedFns([
      ...queuedFns,
      {
        args,
        fn: track
      }
    ]);
    //  console.log("cloned", cloned());
  };

  useEffect(() => {
    _initAnalytics()
      .then(() => {
        setTimeout(() => {
          console.log("setInitialized to true");
          setInitialized(true);
        }, 3000);
      })
      .catch((err) => console.error(err)); // eslint-disable-line
  }, []);

  useEffect(() => {
    if (initialized) {
      callQueuedFns();
    }
  }, [initialized]);

  return {
    track: initialized ? track : trackNotReady,
    // track: trackNotReady,
    initialized
  };
};

const _initScript = () => {
  const isStaging = /dev|test|localhost/.test(window.location.toString());

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://assets.adobedtm.com/027a4b956dfde71f578f2758fd64745bb956cb47/satelliteLib-3553430d7b7afdf815f5e347a69e8c58976c3ca2${
      isStaging ? "-staging" : ""
    }.js`;
    script.addEventListener("load", () => {
      satelliteScriptLoaded = true;
      resolve();
    });
    script.addEventListener("onerror", reject);

    document.head && document.head.appendChild(script);
  });
};

const _initAnalytics = () => {
  if (!window.digitalData) {
    window.digitalData = {};
  }

  // script loading has started, but not completed, return a promise that will
  // resolve when complete
  if (satelliteScriptPromise && !satelliteScriptLoaded) {
    return satelliteScriptPromise;
  }

  // script has not yet been loaded, nor has loading begun.
  // load the script and return a promise that will resolve when complete
  // NOTE: we check both `s` and `_satellite` as a fully Adobe Analytics script will create both.
  // We were seeing some cases where the Adobe Analytics Debugger plugin would inject `_satellite`
  // but not `s`, causing issues if we only check `_satellite`
  if (!window.s || !window._satellite) {
    satelliteScriptPromise = _initScript();

    return satelliteScriptPromise;
  }

  // script is already loaded, just resolve
  return Promise.resolve();
};

export default useAdobeAnalytics;
