const getHostAPIUrl = () => {
  const ENV = import.meta.env.VITE_PUBLIC_NODE_ENV;

  if (ENV == "staging") {
    // return `https://roc-staging-api.cyces.co`;
    return "https://staging-v2.realtyofamerica.com";
  } else if (ENV == "uat") {
    return `https://roc-staging-api.cyces.co`;
  } else if (ENV == "production") {
    return `https://roc-staging-api.cyces.co`;
  }
  // return `https://roc-staging-api.cyces.co`
  return "https://staging-v2.realtyofamerica.com";
};
export default getHostAPIUrl;
