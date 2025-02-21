const blackList = new Set();

const revokeAccessToken = (accessToken:string) => {
  blackList.add(accessToken);
};

export {
  blackList,
  revokeAccessToken,
};
