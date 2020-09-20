const timestampToDate = (timestamp) => {
  const formattedTime = `${timestamp.toDateString()} ${timestamp.toLocaleTimeString()}`;
  return formattedTime;
};

export default timestampToDate;
