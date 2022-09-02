const truncate = (str, n) => ((str.length > n) ? `${str.slice(0, n - 1)}...` : str);

export default truncate;
